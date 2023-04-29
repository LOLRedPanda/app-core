class PlayerController {
	constructor(riotApi) {
		this.riotApi = riotApi
	}

	async getIdsByName(playerName){
		try{
			const result = await this.riotApi.getPlayerIdsByName(playerName)
			console.log(result)
			const {id, puuid, accountId, name} = result
			return {summonerId: id, puuid, accountId, name}
		}
		catch (e){
			throw new Error(`cannot get Player Ids: ${e}`)
		}
	}
}

module.exports.PlayerController = PlayerController

