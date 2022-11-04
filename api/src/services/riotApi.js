const axios = require('axios')

class RiotApi {
    constructor() {
        this.na1url = 'https://na1.api.riotgames.com/lol'
        this.americasurl = 'https://americas.api.riotgames.com/lol'
        this.options = {
            params: {
                api_key: process.env.RIOT_API_KEY
            }
        }
    }

    async getPlayerIdByName(name) {
        const {data} = await axios.get(`${this.na1url}/summoner/v4/summoners/by-name/${name}`, this.options)
        return data.id
    }

    async getPlayerPuuIdByName(name) {
        const {data} = await axios.get(`${this.na1url}/summoner/v4/summoners/by-name/${name}`, this.options)
        return data.puuid
    }

    async getTopUsedChampionsIds(PlayerId, count) {
        const options = {...this.options}
        options.params.count = count
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
         const {data} = await axios.get(`${this.na1url}/league/v4/entries/by-summoner/${PlayerID}`, this.options)
         const rank = data[0].tier + " " + data[0].rank
        return rank
     }
    //  async getCSPerMinute(){

    //  }

     async getMatchId(PlayerID, queueId, count){
        const options = {...this.options}
        options.params.queue = queueId
        options.params.count = count
        const {data} = await axios.get(`${this.americasurl}/match/v5/matches/by-puuid/${PlayerID}/ids`, this.options)
        return data
     }

     async getMatchParticipants(matchId) {
        const options = {...this.options}
        const {data} = await axios.get(`${this.americasurl}/match/v5/matches/${matchId}`, this.options)
        return data.info.participants
     }
     async getMatchId(PlayerID, queueId, count){
        const options = {...this.options}
        options.params.queue = queueId
        options.params.count = count
        const {data} = await axios.get(`${this.americasurl}/match/v5/matches/by-puuid/${PlayerID}/ids`, this.options)
        return data
     }

     async getCSPerMinute(puuid, matchId) {
        let CSPerMinute = 0
        for(let i = 0; i < matchId.length; i++){
            const participants = await this.getMatchParticipants(matchId[i])

            const participant = participants.find(participant => {
             if(participant.puuid === puuid) return participant
             })
             CSPerMinute += participant.totalMinionsKilled/(participant.timePlayed/60)
        }
        return CSPerMinute/matchId.length
    }
}


module.exports.RiotApi = RiotApi