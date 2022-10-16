const jsonQuery = require('json-query')
const {Champions} = require('../models/champions')

class SummonerController {
    constructor(name, riotApi) {
        this.name = name
        this.riotApi = riotApi
        const champs = new Champions()
        this.champions = champs.getChampions()
    }

    async getTop5Champions(name) {
        const id = await this.riotApi.getPlayerIdByName(name)
        return await this.getChampionMastery(id)
    }

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
}

module.exports.SummonerController = SummonerController

