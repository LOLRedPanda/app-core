provider "azurerm" {
  features {}
}

module "resource_group" {
  source = "./modules/resource_group"

  resource_group_name = var.resource_group_name
  location = var.location
}

module "service_plan" {
  source = "./modules/service_plan"

  resource_group_name = var.resource_group_name
  service_plan_name = var.service_plan_name
  location = var.location
}

module "cosmos_db" {
  source = "./modules/cosmosdb"

  resource_group_name = var.resource_group_name
  db_name = var.db_name
  location = var.location
}

module "windows_web_app" {
  source = "./modules/windows_web_app"

  resource_group_name = var.resource_group_name
  web_app_name = var.web_app_name
  location = var.location
  app_env_vars = var.app_env_vars
  service_plan_id = module.service_plan.service_plan_id
}

