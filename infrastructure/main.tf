provider "azurerm" {
  features {}
}

terraform {
  backend "azurerm" {
    resource_group_name  = "${var.ENVIRONMENT}-lol-scout-rg"
    storage_account_name = "${var.ENVIRONMENT}lolscoutsa01"
    container_name       = "terraform-state"
    key                  = "terraform.tfstate"
  }
}

resource "azurerm_resource_group" "lol-scout-resource-group" {
  name     = "${var.ENVIRONMENT}-lol-scout-rg"
  location = "eastus"
}
