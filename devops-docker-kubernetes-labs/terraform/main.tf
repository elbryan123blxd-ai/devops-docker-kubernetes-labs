terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source = "./modules/vpc"

  project_name         = "cloudops-store"
  cidr_block           = "10.0.0.0/16"
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.10.0/24", "10.0.20.0/24"]
}

module "ecr" {
  source           = "./modules/ecr"
  repository_names = ["frontend", "api", "worker"]
}

module "eks" {
  source = "./modules/eks"

  cluster_name    = "cloudops-cluster"
  cluster_version = "1.31"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnet_ids

  # Endpoint privado obligatorio; el público queda deshabilitado para evitar
  # exponer el plano de control a internet. Acceder vía VPN/bastion/Cloud9.
  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true
}

module "rds" {
  source = "./modules/rds"

  vpc_id            = module.vpc.vpc_id
  subnet_ids        = module.vpc.private_subnet_ids
  allocated_storage = 20
  engine            = "postgres"
  engine_version    = "15"
  instance_class    = "db.t3.micro"
  db_name           = "appdb"
  username          = "dbadmin"
  password          = var.db_password
}