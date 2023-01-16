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
    resource_group_name  = "test-lol-scout-rg"
    storage_account_name = "testlolscoutsa01"
    container_name       = "terraform-state"
    key                  = "terraform.tfstate"
  }
}

module "infra" {
  source = "../../"
  resource_group_name = "${local.env}-lol-scout-rg"
  storage_account_name = "${local.env}lolscoutsa01"
  service_plan_name = "${local.env}lolscoutsp01"
  container_registry_name = "${local.env}lolscoutcr01"
  db_name = "${local.env}lolscoutdb01"
  web_app_name = "${local.env}lolscoutwa01"
  location = local.location
  app_command_line = "server.js"
  app_env_vars = {
    RIOT_API_KEY = local.riot_api_key
  }
}
