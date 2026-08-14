output "cluster_endpoint" {
  description = "Endpoint para el control plane de EKS"
  value       = module.eks.cluster_endpoint
}

output "cluster_name" {
  description = "Nombre del clúster EKS"
  value       = module.eks.cluster_name
}