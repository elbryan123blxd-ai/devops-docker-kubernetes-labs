module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = var.vpc_id
  subnet_ids = var.subnet_ids

  cluster_endpoint_public_access  = var.cluster_endpoint_public_access
  cluster_endpoint_private_access = var.cluster_endpoint_private_access

  # Admin automatico para el creador del cluster. En produccion, reemplazar por
  # access_entries explicitos (principio de menor privilegio) y usar IRSA para
  # los workloads en vez de dar permisos amplios al creador.
  enable_cluster_creator_admin_permissions = true

  # Coincide con el cluster ya creado en AWS para no forzar su reemplazo.
  bootstrap_self_managed_addons = false

  # Access entries + access policies requieren el modo de autenticacion API.
  authentication_mode = "API"

  node_security_group_additional_rules = {
    ingress_web_from_self = {
      description = "Node-to-node HTTP/HTTPS para backends del ingress"
      protocol    = "tcp"
      from_port   = 80
      to_port     = 443
      type        = "ingress"
      self        = true
    }
  }

  eks_managed_node_groups = {
    default = {
      min_size     = var.node_min_size
      max_size     = var.node_max_size
      desired_size = var.node_desired_size

      instance_types = [var.instance_type]
      ami_type       = "AL2_x86_64"
    }
  }
}

# Los nodos del node group necesitan tirar imagenes de ECR, si no los pods
# caen en ImagePullBackOff.
data "aws_iam_policy" "ecr_read_only" {
  arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_role_policy_attachment" "node_ecr_read_only" {
  role       = module.eks.eks_managed_node_groups["default"].iam_role_name
  policy_arn = data.aws_iam_policy.ecr_read_only.arn
}
