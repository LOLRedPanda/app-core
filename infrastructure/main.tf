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

resource "azurerm_resource_group" "lol_scout_rg" {
  name     = "dev-lol-scout-rg"
  location = "eastus"
}

resource "azurerm_storage_account" "lol_scout_sa" {
  name                     = "devlolscoutsa01"
  resource_group_name      = azurerm_resource_group.lol_scout_rg.name
  location                 = azurerm_resource_group.lol_scout_rg.location
  account_tier             = "Standard"
}

resource "azurerm_storage_container" "lol_scout_sa_container" {
  name                  = "terraform-state"
  storage_account_name  = azurerm_storage_account.lol_scout_sa.name
  container_access_type = "private"
}
