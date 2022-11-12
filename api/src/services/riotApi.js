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

    async getPlayerIdByName(name) {
        const result = await this.client.get(`${this.na1url}/summoner/v4/summoners/by-name/${name}`, this.options)
        return result.id
    }

    async getPlayerPuuIdByName(name) {
        console.log('getPlayerPuuidByName')
        await this.sleep()
        const {data} = await axios.get(`${this.na1url}/summoner/v4/summoners/by-name/${name}`, this.options)
        return data.puuid
    }

    async getTopUsedChampionsIds(PlayerId, count) {
        console.log('getTopUsedChampionIds')
        const options = {...this.options}
        options.params.count = count
        await this.sleep()
        const {data} = await axios.get(`${this.na1url}/champion-mastery/v4/champion-masteries/by-summoner/${PlayerId}/top`, options)
        const championIds = []
        data.forEach(
            (champion) => {
                const {championId} = champion
                championIds.push(championId)
            }
        )
        return championIds
    }

     async getCurrentRank(PlayerID){
        console.log('getCurrentRank')
        await this.sleep()
         const {data} = await axios.get(`${this.na1url}/league/v4/entries/by-summoner/${PlayerID}`, this.options)
         const rank = data[0].tier + " " + data[0].rank
        return rank
     }


     async getMatchIds(PlayerID, queueId, count){
        console.log('getMatchIds')
        const options = {...this.options}
        options.params.queue = queueId
        options.params.count = count
        await this.sleep()
        const {data} = await axios.get(`${this.americasurl}/match/v5/matches/by-puuid/${PlayerID}/ids`, this.options)
        return data
     }

     async getMatchParticipants(matchId) {
        console.log('getMatchParticipants')
        const options = {...this.options}
        await this.sleep()
        const {data} = await axios.get(`${this.americasurl}/match/v5/matches/${matchId}`, this.options)
        return data.info.participants
     }

}


module.exports.RiotApi = RiotApi