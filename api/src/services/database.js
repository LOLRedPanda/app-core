const { CosmosClient } = require("@azure/cosmos");

class Database {
    constructor() {
        // const connectionString = "AccountEndpoint=https://testlolscoutdb01.documents.azure.com:443/;AccountKey=rzVppmHoAbSVvZkfgzwgsWExLErGAaQpSp2lDNABQO5hWvxpZgMZTeURmw4XUEWCd9eJht3nyR4ZACDbPP3z6Q==;"
        this.connectionString = `AccountEndpoint=${process.env.COSMOS_DB_URI};AccountKey=${process.env.COSMOS_DB_PRIMARY_KEY};`
        this.cosmosClient = new CosmosClient(this.connectionString);
        this.database = this.cosmosClient.database('RedPanda')
        this.teamsContainer = this.database.container('teams')
        this.playersContainer = this.database.container('players')
        this.matchesContainer = this.database.container('matches')
    }

    async createTeam(teamData) {
        const { resource: createdTeam } = await this.teamsContainer.items.create(teamData)
        return createdTeam
    }

    async getTeam(teamName) {
        console.log(this.teamsContainer)
        const querySpec = {
            query: `SELECT * from c WHERE c.name = "${teamName}"`
        }

        const {resources: items} = await this.teamsContainer.items.query(querySpec).fetchAll()
        return items[0]
    }

    async deleteTeam(teamName) {
        console.log(this.teamsContainer)
        const team = await this.getTeam(teamName)
        
        const { resource: deletedTeam } = await this.teamsContainer.item(team.id).delete()
        return deletedTeam
    }
}


module.exports.Database = Database


