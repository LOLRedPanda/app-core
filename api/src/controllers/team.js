class TeamController {
	constructor(cosmosDB) {
		this.cosmosDB = cosmosDB
	}


	async addTeam(teamData){
		try{
			const result = await this.cosmosDB.createTeam(teamData)
			const {id, name} = result
			return {id, name}
		}
		catch (e){
			throw new Error(`cannot add Team: ${e}`)
		}
	}

	async getTeam(teamName){
		try{
			const querySpec = {
				query: `SELECT * from c WHERE c.name = ${teamName}`
			}
	
			const {resources: items} = await container.items.query(querySpec).fetchAll()
			return items[0]
		}
		catch (e){
			throw new Error(`cannot get Team: ${e}`)
		}
	}

	async deleteTeam(teamName){
		try{
			const {id} = this.getTeam(teamName)
	
			const {resources: item} = await container.item(id)
			console.log(item)
			return 'delete'
		}
		catch (e){
			throw new Error(`cannot delete Team: ${e}`)
		}
	}
}

module.exports.TeamController = TeamController
