resource "azurerm_linux_web_app" "app_api" {
  name                = var.web_app_name
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = var.service_plan_id
  https_only          = true

  site_config {
    always_on = true
    container_registry_use_managed_identity = true
    app_command_line = var.app_command_line
  }

  identity {
    identity_ids = []
    type = "SystemAssigned"
  }

  app_settings = merge(
    var.app_env_vars,
    {
      DOCKER_ENABLE_CI = true
      DOCKER_REGISTRY_SERVER_URL = "https://${var.registry_server_url}"
      WEBSITES_CONTAINER_START_TIME_LIMIT = 1800
    }
  )
}

# TODO: figure out how to import this into state

# resource "azurerm_role_assignment" "acrpull" {
#   scope                = var.resouce_group_name
#   role_definition_name = "AcrPull"
#   principal_id         = azurerm_linux_web_app.app_api.identity.0.principal_id
# }
