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

resource "azurerm_app_service_plan" "app_sp" {
  name                = "devlolscoutsp01"
  location            = azurerm_resource_group.lol_scout_rg.location
  resource_group_name = azurerm_resource_group.lol_scout_rg.name

  sku {
    tier = "Free"
    size = "F1"
  }
}

resource "azurerm_cosmosdb_account" "app_db" {
  name                = "devlolscoutdb01"
  location            = azurerm_resource_group.lol_scout_rg.location
  resource_group_name = azurerm_resource_group.lol_scout_rg.name
  offer_type          = "Standard"

  enable_automatic_failover = true
  enable_free_tier          = true

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 300
    max_staleness_prefix    = 100000
  }

  geo_location {
    location          = "eastus"
    failover_priority = 1
  }

  geo_location {
    location          = "westus"
    failover_priority = 0
  }
}

resource "azurerm_windows_web_app" "app_wa" {
  name                = "devlolscoutwa01"
  resource_group_name = azurerm_resource_group.lol_scout_rg.name
  location            = azurerm_app_service_plan.app_sp.location
  service_plan_id     = azurerm_app_service_plan.app_sp.id

  site_config {
    always_on = false
  }
}

