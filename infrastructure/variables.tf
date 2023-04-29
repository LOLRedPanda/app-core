variable "env" {
  type        = string
  description = "The environment of our resources"
}

variable "resource_group_name" {
  type        = string
  description = "The name of the resource group."
}

variable "storage_account_name" {
  type        = string
  description = "The name of the storage account where terraform-state resides."
}

variable "location" {
  type        = string
  description = "The location the resources are associated with."
}

variable "cosmos_db" {
  type        = bool
  description = "Whether or not to build a cosmos db"
}

variable "db_name" {
  type        = string
  description = "The name of the cosmosdb database"
}

variable "service_plan_name" {
  type        = string
  description = "The name of the app service plan"
}

variable "web_app_name" {
  type        = string
  description = "The name of the web app"
}

variable "api_app_name" {
  type        = string
  description = "The name of the api"
}

variable "container_registry_name" {
  type        = string
  description = "The name of the container registry."
}

variable "api_env_vars" {
  type        = map(any)
  description = "The environment variables for the api."
}

variable "api_command_line" {
  type        = string
  description = "The script command to run the api."
}

variable "ip_restrictions" {
  type        = bool
  description = "whether or not to restrict the ips"
}

variable "ns_whitelist_ips" {
  type        = list(any)
  description = "ns whitelist ips"
}

variable "nw_whitelist_ips" {
  type        = list(any)
  description = "nw whitelist ips"
}

variable "c_whitelist_ips" {
  type        = list(any)
  description = "cw whitelist ips"
}
