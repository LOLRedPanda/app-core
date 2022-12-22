const jsonQuery = require('json-query')
const { Champions } = require('../models/champions')
const { getParticipant } = require('./common')

class SummonerController {
    constructor(riotApi) {
        this.riotApi = riotApi
        const champs = new Champions()
        this.champions = champs.getChampions()
    }

    async getIdsByName(playerName){
        try{
            const result = await this.riotApi.getPlayerIdsByName(playerName)
            const {id, puuid, accountId, name} = result
            return {id, puuid, accountId, name}
        } 
        catch (e){
            throw new Error(`cannot get Player Ids: ${e}`)
        }
    }

    async getChampionMastery(id) {
        try {
            const {data} = await this.riotApi.getChampionMastery(id, 5)
            const champions = data.map(async(champion) => {
            const mastery = await this.riotApi.getChampionMastery(id, 5)
            const champions = mastery.map((champion) => {
                const { championId } = champion
                const { name } = jsonQuery(`[**][key=${championId}]`, { data: this.champions }).value
                console.log(name)
                return name
            })
        })
            return champions
        } catch(e) {
            throw new Error(`cannot get Champion Mastery: ${e}`)
        }
    }

    async getRank(id) {
        try{
            const leagueEntries = await this.riotApi.getleagueEntries(id)
            //console.log(leagueEntries.rank)
            const rank = leagueEntries[0].tier + " " + leagueEntries[0].rank
            return rank
        }catch(e){
            throw new Error(`cannot get Summoner Rank: ${e}`)
        }
    }

    async getMatchIds(puuid) {
        try{
            const matchIds = await this.riotApi.getMatchIds(puuid, 420, 30)
            return matchIds
        } catch(e){
            throw new Error(`cannot get Match Ids: ${e}`)
        }
    }

    async getAllMatchParticipants(matchId) {
        try{
            const match = await this.riotApi.getMatch(matchId)
            if(match){
                const {participants} = match.info
                //console.log(participants)
                return participants
            }
        } catch(e){
            throw new Error(`cannot get match participants: ${e}`)
        }
    }

    async sleep() {
        setTimeout(() => console.log('waiting....'), 1000)
    }

    async getAllPlayersForAllMatches(matchIds) {
        const allMatches = Promise.all(matchIds.map(async (matchId) => {
            const participants = await this.getAllMatchParticipants(matchId)
            return await participants
        }))
        return (await allMatches).flat()
    }

    async filterPlayersMatches(puuid, participants) {
        const matches = participants.filter((participant) => participant && participant.puuid === puuid)
        return matches
    }

    async calculateAverageCSPerMinute(playerMatches) {
        const csPerMinutes = playerMatches.map((match) => {
            const CSPerMinute = (match.totalMinionsKilled / (match.timePlayed / 60))
            return CSPerMinute
        })
        const sum = csPerMinutes.reduce((accumulator, a) => accumulator + a, 0)
        const FinalCSPM = await sum / await csPerMinutes.length
        return Math.ceil(FinalCSPM * 100 / 100)
    }

    async getCSPerMinute(matchIds, puuid) {
        const allPlayersForAllMatches = await this.getAllPlayersForAllMatches(matchIds)
        console.log('got all players for all matches')
        const playersMatches = await this.filterPlayersMatches(puuid, allPlayersForAllMatches)
        const averageCSPerMinute = await this.calculateAverageCSPerMinute(playersMatches)
        return averageCSPerMinute
    }
}

module.exports.SummonerController = SummonerController

