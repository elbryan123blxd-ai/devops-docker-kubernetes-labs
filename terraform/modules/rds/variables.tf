variable "allocated_storage" {
  default = 20
}

variable "engine" {
  default = "postgres"
}

variable "engine_version" {
  default = "15.4"
}

variable "instance_class" {
  default = "db.t3.micro"
}

variable "db_name" {
  default = "appdb"
}

variable "username" {
  type = string
}

variable "password" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "vpc_id" {
  type = string
}