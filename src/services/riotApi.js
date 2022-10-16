const axios = require('axios')

class RiotApi {
    constructor() {
        this.url = 'https://na1.api.riotgames.com/lol'
        this.options = {
            params: {
                api_key: process.env.RIOT_API_KEY
            }
        }
    }

    async getPlayerIdByName(name) {
        const {data} = await axios.get(`${this.url}/summoner/v4/summoners/by-name/${name}`, this.options)
        return data.id
    }

    async getTopUsedChampionsIds(playerId, count) {
        const options = {...this.options}
        options.params.count = count
        const {data} = await axios.get(`${this.url}/champion-mastery/v4/champion-masteries/by-summoner/${playerId}/top`, options)
        const championIds = []
        data.forEach(
            (champion) => {
                const {championId} = champion
                championIds.push(championId)
            }
        )
        return championIds
    }
}

module.exports.RiotApi = RiotApi