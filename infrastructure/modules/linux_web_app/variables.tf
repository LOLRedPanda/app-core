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
    type = string
    description = "The id of the service plan the web app will use."
}

variable "container_registry_id" {
    type = string
    description = "The id of the container registry the web app will use."
}

variable "registry_server_url" {
    type = string
    description = "The url of the container registry the web app will use."
}

variable "api_env_vars" {
    type = string
    description = "The environment variables for the application."
}

variable "app_command_line" {
    type = string
    description = "The script command to run the application."
}

variable "ip_restrictions" {
    type = bool
    description = "whether or not to restrict the ips"
}

variable "ns_whitelist_ips" {
    type = list
    description = "ns whitelist ips"
}

variable "nw_whitelist_ips" {
    type = list
    description = "nw whitelist ips"
}

variable "c_whitelist_ips" {
    type = list
    description = "cw whitelist ips"
}

