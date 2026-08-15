module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = var.vpc_id
  subnet_ids = var.subnet_ids

  enable_cluster_creator_admin_permissions = true

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
