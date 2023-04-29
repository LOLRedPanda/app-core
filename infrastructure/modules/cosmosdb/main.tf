resource "azurerm_cosmosdb_account" "app_db" {
  name                = var.db_name
  location            = var.location
  resource_group_name = var.resource_group_name
  offer_type          = "Standard"

  enable_automatic_failover = true
  enable_free_tier          = true

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 300
    max_staleness_prefix    = 100000
  }

  geo_location {
    location          = var.location
    failover_priority = 1
  }

  geo_location {
    location          = "westus"
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_sql_database" "database" {
  name                = "RedPanda"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.app_db.name
}

resource "azurerm_cosmosdb_sql_container" "teamContainer" {
  name                = "teams"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.app_db.name
  database_name       = azurerm_cosmosdb_sql_database.database.name
  partition_key_path  = "id"
}

resource "azurerm_cosmosdb_sql_container" "playersContainer" {
  name                = "players"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.app_db.name
  database_name       = azurerm_cosmosdb_sql_database.database.name
  partition_key_path  = "id"
}

resource "azurerm_cosmosdb_sql_container" "matchesContainer" {
  name                = "matches"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.app_db.name
  database_name       = azurerm_cosmosdb_sql_database.database.name
  partition_key_path  = "id"
}
