locals {
  env = var.env
  riot_api_key = var.riot_api_key
  location = "eastus"
}
provider "azurerm" {
  features {}
}

terraform {
  backend "azurerm" {
    resource_group_name  = "prod-lol-scout-rg"
    storage_account_name = "prodlolscoutsa01"
    container_name       = "terraform-state"
    key                  = "terraform.tfstate"
  }
}

module "infra" {
  source = "../../"
  env = local.env

  # Resource Group
  resource_group_name = "${local.env}-lol-scout-rg"
  location = local.location

  # Storage Account
  storage_account_name = "${local.env}lolscoutsa01"

  # Service Plan
  service_plan_name = "${local.env}lolscoutsp01"

  # DB
  cosmos_db = true
  db_name = "${local.env}lolscoutdb01"

  # Web Apps
  api_app_name = "${local.env}lolscoutwa01"
  web_app_name = "${local.env}lolscoutwa02"
  container_registry_name = "${local.env}lolscoutcr01"
  api_command_line = "server.js"
  ip_restrictions = false
  ns_whitelist_ips = []
  nw_whitelist_ips = []
  c_whitelist_ips = []
  api_env_vars = {
    RIOT_API_KEY = local.riot_api_key
  }
}
