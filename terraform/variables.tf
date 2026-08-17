variable "db_password" {
  type      = string
  sensitive = true
}

variable "circleci_org_id" {
  type        = string
  description = "Org ID de CircleCI (para OIDC a nivel de org)"
  default     = "8335cec0-438d-4ef8-8fd4-94fbe25145e5"
}

variable "circleci_project_slug" {
  type        = string
  description = "Slug del proyecto en CircleCI (gh/<user>/<repo>)"
  default     = "gh/elbryan123blxd-ai/devops-docker-kubernetes-labs"
}