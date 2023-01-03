# provider "azurerm" {
#   features {}
# }

# locals {
#   environment = var.environment
# }

# terraform {
#   backend "azurerm" {
#     resource_group_name  = "${locals.environment}-lol-scout-rg"
#     storage_account_name = "devlolscoutsa01"
#     container_name       = "terraform-state"
#     key                  = "terraform.tfstate"
#   }
# }

# resource "azurerm_resource_group" "lol_scout_rg" {
#   name     = "dev-lol-scout-rg"
#   location = "eastus"
# }

# resource "azurerm_app_service_plan" "app_sp" {
#   name                = "devlolscoutsp01"
#   location            = azurerm_resource_group.lol_scout_rg.location
#   resource_group_name = azurerm_resource_group.lol_scout_rg.name

#   sku {
#     tier = "Free"
#     size = "F1"
#   }
# }

module "backend" {
    source = "../../modules/backend"

    resource_group_name = var.resource_group_name
    storage_account_name = var.storage_account_name
}

module "resource_group " {
    source = "../../modules/resource_group"

    resource_group_name = var.resource_group_name
    location = var.location
}

module "service_plan" {
    source = "../../modules/service_plan"

    app_service_plan_name = var.app_service_plan_name
    resource_group_name = var.resource_group_name
    location = var.location
}
