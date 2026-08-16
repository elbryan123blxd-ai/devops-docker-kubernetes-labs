module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = var.vpc_id
  subnet_ids = var.subnet_ids

  cluster_endpoint_public_access  = var.cluster_endpoint_public_access
  cluster_endpoint_private_access = var.cluster_endpoint_private_access

  # Admin automático para el creador del cluster. En producción, reemplazar por
  # access_entries explícitos (principio de menor privilegio) y usar IRSA para
  # los workloads en vez de dar permisos amplios al creador.
  enable_cluster_creator_admin_permissions = true

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
