provider "azurerm" {
  features {}
}

terraform {
  backend "azurerm" {
    resource_group_name  = "dev-lol-scout-rg"
    storage_account_name = "devlolscoutsa01"
    container_name       = "terraform-state"
    key                  = "terraform.tfstate"
  }
}

resource "azurerm_resource_group" "lol-scout-resource-group" {
  name     = "dev-lol-scout-rg"
  location = "eastus"
}

resource "azurerm_storage_account" "lol-scout-storage-account" {
  name                = "devlolscoutsa01"
  resource_group_name = azurerm_resource_group.lol-scout-resource-group.name
  location            = azurerm_resource_group.lol-scout-resource-group.location
  account_tier        = "Standard"
}
