output "db_endpoint" {
  description = "Endpoint de conexion de la base de datos"
  value       = aws_db_instance.main.endpoint
}

output "db_address" {
  description = "Direccion IP/DNS de la base de datos"
  value       = aws_db_instance.main.address
}