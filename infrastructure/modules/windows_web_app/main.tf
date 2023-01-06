resource "azurerm_windows_web_app" "app_wa" {
  name                = var.web_app_name
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = var.service_plan_id

  site_config {
    always_on = false
  }

   app_settings = merge(var.app_env_vars)
}