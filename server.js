require('dotenv').config()
const axios = require('axios')



async function getSummonerId() {

    const {status, data} = await axios.get(
        'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/RedPanda0129', 
        {
            params: {
                api_key: process.env.RIOT_API_KEY
            }
    })
    
    const {id} = data

    
    console.log(id)

    return id

}

async function getChampionMastery() {
    const {status, data} = await axios.get(
        `https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${puuid}`, 
        {
            params: {
                api_key: process.env.RIOT_API_KEY
            }
    })
}

getSummoner()



