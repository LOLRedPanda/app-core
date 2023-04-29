class TeamController {
	constructor() {
	}

	async addTeam(name){
		try{
			return {name}
		}
		catch (e){
			throw new Error(`cannot add Team: ${e}`)
		}
	}
}

module.exports.TeamController = TeamController
