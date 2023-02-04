resource "azurerm_linux_web_app" "app_api" {
  name                = var.api_app_name
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = var.service_plan_id
  https_only          = true

  site_config {
    always_on = true
    container_registry_use_managed_identity = true
    app_command_line = var.api_command_line

    ip_restriction {
      ip_address = "0.0.0.0/0"
      action = var.ip_restrictions ? "Deny" : "Allow"
    }

    dynamic "ip_restriction" {
      for_each = concat(var.ns_whitelist_ips, var.nw_whitelist_ips, var.c_whitelist_ips)
      content {
        ip_address = ip_restriction.value
        action     = "Allow"
        priority   = 100
      }
    }
  }

  identity {
    identity_ids = []
    type = "SystemAssigned"
  }

  app_settings = merge(
    var.api_env_vars,
    {
      DOCKER_ENABLE_CI = true
      WEBSITES_PORT=3000
      DOCKER_REGISTRY_SERVER_URL = "https://${var.registry_server_url}"
      WEBSITES_CONTAINER_START_TIME_LIMIT = 1800
    }
  )
}

resource "azurerm_linux_web_app" "app_web" {
  name                = var.web_app_name
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = var.service_plan_id
  https_only          = true

  site_config {
    always_on = true
    container_registry_use_managed_identity = true

    ip_restriction {
      ip_address = "0.0.0.0/0"
      action = var.ip_restrictions ? "Deny" : "Allow"
    }

    dynamic "ip_restriction" {
      for_each = concat(var.ns_whitelist_ips, var.nw_whitelist_ips, var.c_whitelist_ips)
      content {
        ip_address = ip_restriction.value
        action     = "Allow"
        priority   = 100
      }
    }
  }

  identity {
    identity_ids = []
    type = "SystemAssigned"
  }

  app_settings = merge(
    {
      DOCKER_ENABLE_CI = true
      DOCKER_REGISTRY_SERVER_URL = "https://${var.registry_server_url}"
      WEBSITES_CONTAINER_START_TIME_LIMIT = 1800
    }
  )
}

# TODO: figure out how to import this into state. for now, it needs to be assigned manually

# resource "azurerm_role_assignment" "acrpull" {
#   scope                = var.resouce_group_name
#   role_definition_name = "AcrPull"
#   principal_id         = azurerm_linux_web_app.app_api.identity.0.principal_id
# }
