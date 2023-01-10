resource "azurerm_linux_web_app" "app_api" {
  name                = var.web_app_name
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = var.service_plan_id
  node_version = "18-lts"

  site_config {
    always_on = false
  }

  app_settings = merge(var.app_env_vars)
}
