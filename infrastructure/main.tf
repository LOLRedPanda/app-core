provider "azurerm" {
  features {}
}

module "resource_group" {
  source = "./modules/resource_group"

  resource_group_name = var.resource_group_name
  location = var.location
}

module "storage_account" {
  source = "./modules/storage_account"

  storage_account_name = var.storage_account_name
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
  count  = (var.env != "dev") ? 1 : 0
  source = "./modules/cosmosdb"

  resource_group_name = var.resource_group_name
  db_name = var.db_name
  location = var.location
}

module "linux_web_app" {
  source = "./modules/linux_web_app"

  app_command_line =  var.app_command_line
  container_registry_id = module.container_registry.container_registry_id
  registry_server_url = module.container_registry.login_server
  resource_group_name = var.resource_group_name
  web_app_name = var.web_app_name
  location = var.location
  app_env_vars = var.app_env_vars
  service_plan_id = module.service_plan.service_plan_id
}

module "container_registry" {
  source = "./modules/container_registry"

  resource_group_name = var.resource_group_name
  container_registry_name = var.container_registry_name
  location = var.location
}


