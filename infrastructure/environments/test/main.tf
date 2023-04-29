locals {
  env          = var.env
  riot_api_key = var.riot_api_key
  location     = "eastus"
}
provider "azurerm" {
  features {}
}

terraform {
  backend "azurerm" {
    resource_group_name  = "test-lol-scout-rg"
    storage_account_name = "testlolscoutsa01"
    container_name       = "terraform-state"
    key                  = "terraform.tfstate"
  }
}

module "infra" {
  source = "../../"
  env    = local.env

  # Resource Group
  resource_group_name = "${local.env}-lol-scout-rg"
  location            = local.location

  # Storage Account
  storage_account_name = "${local.env}lolscoutsa01"

  # Service Plan
  service_plan_name = "${local.env}lolscoutsp01"

  # DB
  cosmos_db = true
  db_name   = "${local.env}lolscoutdb01"

  # Web Apps
  api_app_name            = "${local.env}lolscoutwa01"
  web_app_name            = "${local.env}lolscoutwa02"
  container_registry_name = "${local.env}lolscoutcr01"
  api_command_line        = "server.js"
  ip_restrictions         = true
  ns_whitelist_ips        = ["64.184.72.246/32", "184.170.174.120/32", "184.170.174.120/32"]
  nw_whitelist_ips        = ["174.238.49.39/32", "99.61.172.233/32"]
  c_whitelist_ips         = ["76.142.154.179/32", "140.141.199.138/32"]
  api_env_vars = {
    RIOT_API_KEY = local.riot_api_key
  }
}
