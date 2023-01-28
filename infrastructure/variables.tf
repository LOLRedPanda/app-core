variable "env" {
  description = "The environment of our resources"
}

variable "resource_group_name" {
    type = string
    description= "The name of the resource group."
}

variable "storage_account_name" {
    type = string
    description= "The name of the storage account where terraform-state resides."
}

variable "location" {
    type = string
    description = "The location the resources are associated with."
}

variable "db_name" {
    type = string
    description = "The name of the cosmosdb database"
}

variable "service_plan_name" {
    type = string
    description = "The name of the app service plan"
}

variable "web_app_name" {
    type = string
    description = "The name of the cosmosdb database"
}

variable "container_registry_name" {
    type = string
    description = "The name of the container registry."
}

variable "app_env_vars" {
    description = "The environment variables for the application."
}

variable "app_command_line" {
    description = "The script command to run the application."
}
