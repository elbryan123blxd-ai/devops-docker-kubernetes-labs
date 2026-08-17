variable "repository_names" {
  type        = list(string)
  description = "Lista de nombres para los repositorios de los microservicios"
  default     = ["frontend", "api", "worker"]
}