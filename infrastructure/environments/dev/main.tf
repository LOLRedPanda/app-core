locals {
    environment = "dev"
    resource_group_name =  "${locals.environment}-lol-scout-rg"
    storage_account_name = "${locals.environment}lolscoutsa01"
    app_service_plan_name = "${locals.environment}lolscoutsp01"
    location = "eastus"
}

module "main" {
    source = "../../main.tf"
    resource_group_name = locals.resource_group_name
    storage_account_name = locals.storage_account_name
    app_service_plan_name = locals.app_service_plan_name
    location = locals.location
}
