output "login_server" {
    value = azurerm_container_registry.acr.login_server
}

output "principal_id" {
    value = azurerm_container_registry.acr.identity.0.principal_id
}

output "tenant_id" {
    value = azurerm_container_registry.acr.identity.0.tenant_id
}
