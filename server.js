require('dotenv').config()
const fs = require("fs")
const axios = require('axios')
const jsonQuery = require('json-query')
const { lookup } = require('dns')
const { json } = require('express')



async function getTop5Champions() {

    const {status, data} = await axios.get(
        'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/RedPanda0129', 
        {
            params: {
                api_key: process.env.RIOT_API_KEY
            }
    })
    
    const {id} = data

    
    console.log(id)

    getChampionMastery(id)

}

async function getChampionMastery(id) {
    const {status, data} = await axios.get(
        `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}/top`, 
        {
            params: {
                count: 5,
                api_key: process.env.RIOT_API_KEY
            }
    }
    )
    const jsonString = fs.readFileSync("./static-data/champions.json", "utf-8")
    const rawData = JSON.parse(jsonString)
    const championData = rawData.data
    // console.log(championData)
    const top5 = []
    data.forEach(
        (champion) => {
            const {championId} = champion
            const {name} = jsonQuery(`[**][key=${championId}]`, {data: championData}).value
            top5.push(name)
        }
    )
    console.log(top5)
    
  
}

getTop5Champions()



