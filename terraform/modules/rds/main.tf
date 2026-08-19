resource "aws_db_subnet_group" "main" {
  name       = "rds-subnet-group"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "RDS subnet group"
  }
}

resource "aws_security_group" "rds" {
  name        = "rds-security-group"
  description = "Permitir acceso a la base de datos"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # Permite acceso a toda la red interna de tu VPC
  }
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Acceso al Query Editor de la consola AWS (RDS publica)
    description = "Query Editor AWS console"
  }
  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    # Solo salida dentro de la VPC; sin acceso directo a internet.
    cidr_blocks = ["10.0.0.0/16"]
  }
}

resource "aws_db_instance" "main" {
  allocated_storage         = var.allocated_storage
  engine                    = var.engine
  engine_version            = var.engine_version
  instance_class            = var.instance_class
  db_name                   = var.db_name
  username                  = var.username
  password                  = var.password
  db_subnet_group_name      = aws_db_subnet_group.main.name
  vpc_security_group_ids    = [aws_security_group.rds.id]
  storage_encrypted         = true
  publicly_accessible       = true
  apply_immediately         = true
  skip_final_snapshot       = false
  final_snapshot_identifier = "app-postgres-final"

  lifecycle {
    # Protege la base de datos de un 'terraform destroy' accidental.
    # Para tirar el resto de la infra sin borrar la DB:
    #   terraform state rm module.rds
    #   terraform destroy
    prevent_destroy = true
  }

  tags = {
    Name = "app-postgres-db"
  }
}