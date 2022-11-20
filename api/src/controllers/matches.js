const jsonQuery = require('json-query')
const {Champions} = require('../models/champions')
const { getParticipant } = require('./common')


class MatchesController{
    constructor(riotApi) {
        this.riotApi = riotApi
        const champs = new Champions()
        this.champions = champs.getChampions()
    }

    async getMatchId(puuid){
        const matchId = await this.riotApi.getMatchIds(puuid, 420, 1)
        return matchId
    }

    async getPlayerMatchHistory(matchId, puuid) {
        const participants = await this.riotApi.getMatchParticipants(matchId)

        const participant = getParticipant(participants, puuid)

        if(participant === undefined){
            return `PUUID: ${puuid} does not exist for match: ${matchId}`
        }
        const kda = (participant.kills + participant.assists)/participant.deaths
        const Time = participant.timePlayed/60
        const time = Math.ceil(Time * 100) / 100;
        const KDA = Math.ceil(kda * 100) / 100;
        const data = {
            puuid: participant.puuid,
            championId: participant.championId,
            kills: participant.kills,
            deaths: participant.deaths,
            assists: participant.assists,
            KDA,
            time,
        }
        return data
    }
}

module.exports.MatchesController = MatchesController