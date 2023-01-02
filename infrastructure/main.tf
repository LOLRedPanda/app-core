provider "azurerm" {
  features {}
}

locals {
  resource_group_name  = "${var.ENVIRONMENT}-lol-scout-rg"
  storage_account_name = "${var.ENVIRONMENT}lolscoutsa01"
  name                 = "${var.ENVIRONMENT}-lol-scout-rg"
}

terraform {
  backend "azurerm" {
    resource_group_name  = locals.resource_group_name
    storage_account_name = locals.storage_account_name
    container_name       = "terraform-state"
    key                  = "terraform.tfstate"
  }
}

resource "azurerm_resource_group" "lol-scout-resource-group" {
  name     = locals.name
  location = "eastus"
}
