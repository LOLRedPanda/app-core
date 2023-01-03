locals {
    environment = "dev"
    resource_group_name =  "${locals.environment}-lol-scout-rg"
    storage_account_name = "${locals.environment}lolscoutsa01"
    app_service_plan_name = "${locals.environment}lolscoutsp01"
    location = "eastus"
}


module "backend" {
    source = "../../modules/backend"

    resource_group_name = locals.resource_group_name
    storage_account_name = locals.storage_account_name
}

module "resource_group " {
    source = "../../modules/resource_group"

    resource_group_name = local.resource_group_name
    location = local.location
}

module "service_plan" {
    source = "../../modules/service_plan"

    app_service_plan_name = local.app_service_plan_name
    resource_group_name = local.resource_group_name
    location = local.location
}
