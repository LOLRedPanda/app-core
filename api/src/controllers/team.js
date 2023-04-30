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
			const {id, name} = await this.cosmosDB.getTeam(teamName)
			return {id, name}
		}
		catch (e){
			throw new Error(`cannot get Team: ${e}`)
		}
	}

	async deleteTeam(teamName){
		try{
			const result = await this.getTeam(teamName)
			const {item} = await this.cosmosDB.deleteTeam(result.id)
			return {id: item.id}
		}
		catch (e){
			throw new Error(`cannot delete Team: ${e}`)
		}
	}
}

module.exports.TeamController = TeamController
