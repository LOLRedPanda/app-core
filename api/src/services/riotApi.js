const { RestClient } = require('./restClient')
const { Req } = require('../services/request')

class RiotApi {
	constructor() {
		this.na1url = 'https://na1.api.riotgames.com/lol'
		this.americasurl = 'https://americas.api.riotgames.com/lol'
		this.options = {
			params: {
				api_key: process.env.RIOT_API_KEY,
			},
		}
		const request = new Req()
		this.client = new RestClient(request)
	}

	async sleep() {
		setTimeout(() => console.log('waiting....'), 10000)
	}

	async getPlayerIdsByName(name) {
		const result = await this.client.get(
			`${this.na1url}/summoner/v4/summoners/by-name/${name}`,
			this.options
		)
		return result
	}

	async getLeagueEntries(PlayerID) {
		const result = await this.client.get(
			`${this.na1url}/league/v4/entries/by-summoner/${PlayerID}`,
			this.options
		)
		return result
	}

	async getMatchIds(PlayerID, queueId, count) {
		const options = { ...this.options }
		options.params.queue = queueId
		options.params.count = count
		let result
		try {
			result = await this.client.get(
				`${this.americasurl}/match/v5/matches/by-puuid/${PlayerID}/ids`,
				options
			)
		} catch (e) {
			console.log(e)
		}
		return result
	}

	async getMatch(matchId) {
		const options = { ...this.options }
		const result = await this.client.get(
			`${this.americasurl}/match/v5/matches/${matchId}`,
			options
		)
		return result
	}
}

module.exports.RiotApi = RiotApi
