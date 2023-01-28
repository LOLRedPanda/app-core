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
    description = "The name of the web app"
}

variable "api_app_name" {
    type = string
    description = "The name of the api app"
}

variable "service_plan_id" {
    description = "The id of the service plan the web app will use."
}

variable "container_registry_id" {
    description = "The id of the container registry the web app will use."
}

variable "registry_server_url" {
    description = "The url of the container registry the web app will use."
}

variable "app_env_vars" {
    description = "The environment variables for the application."
}

variable "app_command_line" {
    description = "The script command to run the application."
}

