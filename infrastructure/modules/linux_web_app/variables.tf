variable "resource_group_name" {
    type = string
    description= "The name of the resource group."
}

variable "location" {
    type = string
    description = "The location the resources are associated with."
}

variable "web_app_name" {
    type = string
    description = "The name of the cosmosdb database"
}

variable "service_plan_id" {
    description = "The id of the service plan the web app will use."
}

variable "app_env_vars" {
    description = "The environment variables for the application."
}

