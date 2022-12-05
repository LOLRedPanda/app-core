const axios = require('axios')
const {RestClient} = require('./restClient')

class RiotApi {
    constructor() {
        this.na1url = 'https://na1.api.riotgames.com/lol'
        this.americasurl = 'https://americas.api.riotgames.com/lol'
        this.options = {
            params: {
                api_key: process.env.RIOT_API_KEY
            }
        }
        this.client = new RestClient()
    }

    async sleep() {
        setTimeout(() => console.log('waiting....'), 10000)
    }

    async getPlayerIdsByName(name) {
        console.log('getPlayerIdsByName')
        const result = await this.client.get(`${this.na1url}/summoner/v4/summoners/by-name/${name}`, this.options)
        return result
    }

    async getChampionMastery(PlayerId, count) {
        console.log('getChampionMastery')
        const options = {...this.options}
        options.params.count = count
        const result = await axios.get(`${this.na1url}/champion-mastery/v4/champion-masteries/by-summoner/${PlayerId}/top`, options)
        return result
    }

     async getleagueEntries(PlayerID){
        console.log('getleagueEntries')
        const result = await axios.get(`${this.na1url}/league/v4/entries/by-summoner/${PlayerID}`, this.options)
        return result
     }


     async getMatchIds(PlayerID, queueId, count){
        console.log('getMatchIds')
        const options = {...this.options}
        options.params.queue = queueId
        options.params.count = count
        const result = await axios.get(`${this.americasurl}/match/v5/matches/by-puuid/${PlayerID}/ids`, options)
        return result
     }

     async getMatch(matchId) {
        console.log('getMatch')
        const options = {...this.options}
        const result = await axios.get(`${this.americasurl}/match/v5/matches/${matchId}`, options)
        return result
     }

}


module.exports.RiotApi = RiotApi