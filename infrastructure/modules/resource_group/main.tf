resource "azurerm_resource_group" "lol_scout_rg" {
  name     = var.resource_group_name
  location = var.location
}
