output "cluster_endpoint" {
  description = "Endpoint para el control plane de EKS"
  value       = module.eks.cluster_endpoint
}

output "cluster_name" {
  description = "Nombre del clúster EKS"
  value       = module.eks.cluster_name
}

output "node_group_iam_role_name" {
  description = "IAM role de los nodos del node group"
  value       = module.eks.eks_managed_node_groups["default"].iam_role_name
}