const jsonQuery = require('json-query')
const {Champions} = require('../models/champions')

class SummonerController {
    constructor(name, riotApi) {
        this.name = name
        this.riotApi = riotApi
        const champs = new Champions()
        this.champions = champs.getChampions()
    }

    // async getPlayerInfo(name) {
    //     const id = await this.riotApi.getPlayerIdByName(name)
    //     return await this.getChampionMastery(id)
    // }

    async getChampionMastery(id) {
        const top5Ids = await this.riotApi.getTopUsedChampionsIds(id, 5)
        const top5Names = []
        top5Ids.forEach(
            (id) => {
                const {name} = jsonQuery(`[**][key=${id}]`, {data: this.champions}).value
                top5Names.push(name)
            }
        )
        return top5Names
    }

    async getRank(id){
        const currentRank = await this.riotApi.getCurrentRank(id)
        return currentRank
    }
    async getMatchId(puuid){
        const matchId = await this.riotApi.getMatchId(puuid, 420, 20)
        return matchId
    }

    async getCSPerMinute(puuid, matchId) {
        const CSPerMinute = await this.riotApi.getCSPerMinute(puuid, matchId)
        return CSPerMinute
    }
}

module.exports.SummonerController = SummonerController

