resource "azurerm_app_service_plan" "app_sp" {
  name                = var.app_service_plan_name
  location            = var.location
  resource_group_name = var.resource_group_name

  sku {
    tier = "Free"
    size = "F1"
  }
}
