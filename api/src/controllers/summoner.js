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

    async getMatchIds(puuid){
        const matchIds = await this.riotApi.getMatchIds(puuid, 420, 20)
        return matchIds
    }

    async getAllMatchParticipants(matchId){
        const participants = await this.riotApi.getMatchParticipants(matchId)
        return participants
    }

    // async getAllMatchesForPlayer(puuid, matchIds) {
    //     const matches = await matchIds.map(async (matchId) => {
    //         const participants = await this.getAllMatchParticipants(matchId)
    //         console.log(participants)
    //         // const participantMatches = participants.filter((participant) => {
    //         //     if (participant.puuid === puuid) {
    //         //         return participant
    //         //     }
    //         // })
    //         return participants
    //     })
    //     console.log(matches)
    //     return matches
    // }

    async getCSPerMinute(puuid, participants) {
        const participant = getParticipant(participants, puuid)
        const CSPerMinute = (participant.totalMinionsKilled/(participant.timePlayed/60))
        return Math.ceil(CSPerMinute * 100) / 100
    }
}

module.exports.SummonerController = SummonerController

