const jsonQuery = require('json-query')
const {Champions} = require('../models/champions')
const { getParticipant } = require('./common')

class SummonerController {
    constructor(name, riotApi) {
        this.name = name
        this.riotApi = riotApi
        const champs = new Champions()
        this.champions = champs.getChampions()
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

    async getRank(id){
        const currentRank = await this.riotApi.getCurrentRank(id)
        return currentRank
    }

    async getMatchIds(puuid){
        const matchIds = await this.riotApi.getMatchIds(puuid, 420, 20)
        return matchIds
    }

    async getAllMatchParticipants(matchId){
        const participants = await this.riotApi.getMatchParticipants(matchId)
        return participants
    }

    async sleep() {
        setTimeout(() => console.log('waiting....'), 1000)
    }

    async getAllPlayersForAllMatches(matchIds) {
        const allMatches = Promise.all(matchIds.map(async (matchId) => {
            await this.sleep()
            const participants = await this.getAllMatchParticipants(matchId)
            return await participants
        }))
        return (await allMatches).flat()
    }

    async filterPlayersMatches(puuid, participants) {
        const matches = participants.filter((participant) => participant.puuid === puuid)
        return matches
    }

   async calculateAverageCSPerMinute(playerMatches) {
        const csPerMinutes = playerMatches.map((match) => {
            const CSPerMinute = (match.totalMinionsKilled/(match.timePlayed/60))
            return CSPerMinute
        })
        const sum  = csPerMinutes.reduce((accumulator, a) => accumulator + a, 0)
        const FinalCSPM = await sum / await csPerMinutes.length
        return Math.ceil(FinalCSPM * 100 / 100)
    }

    async getCSPerMinute(matchIds, puuid) {
        const allPlayersForAllMatches = await this.getAllPlayersForAllMatches(matchIds)
        const playersMatches = await this.filterPlayersMatches(puuid, allPlayersForAllMatches)
        const averageCSPerMinute = await this.calculateAverageCSPerMinute(playersMatches)
        return averageCSPerMinute
    }
}

module.exports.SummonerController = SummonerController

