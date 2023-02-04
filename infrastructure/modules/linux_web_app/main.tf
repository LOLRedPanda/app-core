locals {
  ip_addresses = [{
    action = "Deny"
    ip_address = cidrhost("0.0.0.0/0", 0)
    name = "DenyAll"
    priority = 2147483647
  }]
}

resource "azurerm_linux_web_app" "app_api" {
  name                = var.api_app_name
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
    dynamic "ip_restriction" {
      for_each = local.ip_addresses
      content {
        ip_address  = each.ip_address
        action = each.action
        name = each.name
        priority = each.priority
      }
    }
    # ip_restriction = [{
    #   action = "Deny"
    #   ip_address = "0.0.0.0/0"
    #   name = "DenyAll"
    #   priority = 2147483647
    #     headers = [ {
    #     x_azure_fdid = [ "" ]
    #     x_fd_health_probe = [ "" ]
    #     x_forwarded_for = [ "" ]
    #     x_forwarded_host = [ "" ]
    #   }]
    #     service_tag = ""
    #     virtual_network_subnet_id = ""
    # }]
    # {
    #   action = "Allow"
    #   ip_address = "64.184.72.246/32"
    #   name = "NSC1"
    #   priority = 100
    # },
    # {
    #   action = "Allow"
    #   ip_address = "184.170.174.120/32"
    #   name = "NSC1"
    #   priority = 100
    # },
    #  {
    #   action = "Allow"
    #   ip_address = "184.170.174.120/32"
    #   name = "NSP"
    #   priority = 100
    # },
    # {
    #   action = "Allow"
    #   ip_address = "174.238.49.39/32"
    #   name = "NWP"
    #   priority = 100
    # },
    # {
    #   action = "Allow"
    #   ip_address = "99.61.172.233/32"
    #   name = "NWC1"
    #   priority = 100
    # }
    # ]
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
