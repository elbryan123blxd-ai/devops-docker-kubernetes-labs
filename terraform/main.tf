terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.27"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# Cluster EKS (se crea en el modulo eks). Se usa para configurar los
# providers de kubernetes/helm y para el access entry de CircleCI.
data "aws_eks_cluster" "this" {
  name = module.eks.cluster_name

  # El cluster se crea dentro de module.eks. Sin depends_on, Terraform intenta
  # leer este data source en la fase de plan (cuando el cluster aun no existe)
  # y falla con "couldn't find resource". Se fuerza la lectura diferida a apply.
  depends_on = [module.eks]
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.this.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.this.certificate_authority[0].data)
  exec {
    api_version = "client.authentication.k8s.io/v1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", data.aws_eks_cluster.this.name, "--region", "us-east-1"]
  }
}

provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.this.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.this.certificate_authority[0].data)
    exec {
      api_version = "client.authentication.k8s.io/v1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", data.aws_eks_cluster.this.name, "--region", "us-east-1"]
    }
  }
}

module "vpc" {
  source = "./modules/vpc"

  project_name         = "cloudops-store"
  cidr_block           = "10.0.0.0/16"
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.10.0/24", "10.0.20.0/24"]
}

module "ecr" {
  source           = "./modules/ecr"
  repository_names = ["frontend", "api", "worker"]
}

module "eks" {
  source = "./modules/eks"

  cluster_name    = "cloudops-cluster"
  cluster_version = "1.31"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnet_ids

  # Endpoint privado obligatorio; el publico queda habilitado para acceder
  # via aws cli / CircleCI OIDC (sin exponer el plano de control a mas nadie).
  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true
}

# RDS Postgres para la app (tienda de productos).
module "rds" {
  source = "./modules/rds"

  vpc_id            = module.vpc.vpc_id
  subnet_ids        = module.vpc.private_subnet_ids
  allocated_storage = 20
  engine            = "postgres"
  engine_version    = "15"
  instance_class    = "db.t3.micro"
  db_name           = "appdb"
  username          = "dbadmin"
  password          = var.db_password
}

# Configuracion de conexion a RDS para la API (no sensible).
# Creado por terraform para no hardcodear el endpoint en los manifests.
resource "kubernetes_config_map" "api_db_config" {
  metadata {
    name      = "api-db-config"
    namespace = "default"
  }

  data = {
    db_host = module.rds.db_address
    db_port = "5432"
    db_name = "appdb"
    db_user = "dbadmin"
  }
}

# Password de la BD (sensible) inyectado a la API como Secret de Kubernetes.
resource "kubernetes_secret" "api_db_secret" {
  metadata {
    name      = "api-db-secret"
    namespace = "default"
  }

  data = {
    password = var.db_password
  }
}

# ---------------------------------------------------------------------------
# CircleCI -> AWS via OIDC (sin claves estaticas de larga duracion)
# ---------------------------------------------------------------------------

# OIDC provider de CircleCI a nivel de org.
data "tls_certificate" "circleci_oidc" {
  url = "https://oidc.circleci.com/org/${var.circleci_org_id}"
}

resource "aws_iam_openid_connect_provider" "circleci" {
  url             = data.tls_certificate.circleci_oidc.url
  client_id_list  = [var.circleci_org_id]
  thumbprint_list = [data.tls_certificate.circleci_oidc.certificates[0].sha1_fingerprint]
}

resource "aws_iam_role" "circleci_deploy" {
  name = "circleci-deploy-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Federated = aws_iam_openid_connect_provider.circleci.arn
      }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "oidc.circleci.com/org/${var.circleci_org_id}:aud" = var.circleci_org_id
        }
      }
    }]
  })
}

# Permisos minimos: ECR (push/pull) + describir el cluster EKS.
resource "aws_iam_role_policy_attachment" "circleci_ecr" {
  role       = aws_iam_role.circleci_deploy.id
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}

resource "aws_iam_role_policy" "circleci_eks_describe" {
  role = aws_iam_role.circleci_deploy.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["eks:DescribeCluster", "eks:ListClusters"]
      Resource = "*"
    }]
  })
}

# Autorizar el rol de CircleCI a administrar el cluster via kubectl.
resource "aws_eks_access_entry" "circleci" {
  cluster_name  = module.eks.cluster_name
  principal_arn = aws_iam_role.circleci_deploy.arn
  type          = "STANDARD"
}

resource "aws_eks_access_policy_association" "circleci" {
  cluster_name  = module.eks.cluster_name
  principal_arn = aws_iam_role.circleci_deploy.arn
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
  access_scope {
    type = "cluster"
  }
  depends_on = [aws_eks_access_entry.circleci]
}

# ---------------------------------------------------------------------------
# ingress-nginx gestionado por Terraform (helm provider) -> crea el ELB.
# ---------------------------------------------------------------------------

resource "helm_release" "ingress_nginx" {
  name             = "ingress-nginx"
  namespace        = "ingress-nginx"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  create_namespace = true

  set {
    name  = "controller.service.type"
    value = "LoadBalancer"
  }
}

# ---------------------------------------------------------------------------
# EKS managed addons. El cluster se crea via API con
# bootstrap_cluster_creator_admin_permissions=false, por lo que EKS NO
# auto-provisiona estos addons. Sin vpc-cni/coredns/kube-proxy los nodos
# no pasan a Ready (NodeCreationFailure). Se crean explicitamente.
# ---------------------------------------------------------------------------

resource "aws_eks_addon" "vpc_cni" {
  cluster_name = module.eks.cluster_name
  addon_name   = "vpc-cni"
}

resource "aws_eks_addon" "coredns" {
  cluster_name = module.eks.cluster_name
  addon_name   = "coredns"
}

resource "aws_eks_addon" "kube_proxy" {
  cluster_name = module.eks.cluster_name
  addon_name   = "kube-proxy"
}

# Nota: aws-ebs-csi-driver se omite a proposito. La app no usa volumenes EBS
# (PersistentVolumeClaims) y el addon quedaba DEGRADED por falta del IAM role
# de IRSA. Si en el futuro necesitas StorageClasses EBS, agregar el addon con
# su respectivo IAM Role para el service account.
