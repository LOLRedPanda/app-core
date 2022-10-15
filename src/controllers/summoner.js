const fs = require("fs")
const jsonQuery = require('json-query')

class SummonerController {
    constructor(name, riotApi) {
        this.name = name
        this.riotApi = riotApi
    }

    async getTop5Champions(name) {
        const id = await this.riotApi.getplayerIdByName(name)
        return await this.getChampionMastery(id)
    }
    
    async getChampionMastery(id) {
        const top5Ids = await this.riotApi.getTopUsedChampionsIds(id, 5)
        const jsonString = fs.readFileSync("./static-data/champions.json", "utf-8")
        const rawData = JSON.parse(jsonString)
        const championData = rawData.data
        const top5Names = []
        top5Ids.forEach(
            (id) => {
                const {name} = jsonQuery(`[**][key=${id}]`, {data: championData}).value
                top5Names.push(name)
            }
        )
        return top5Names
    }
}

module.exports.SummonerController = SummonerController

