resource "aws_ecr_repository" "repo" {
  for_each = toset(var.repository_names)
  name     = each.value

  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }
}