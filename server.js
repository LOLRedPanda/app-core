require('dotenv').config()
const fs = require("fs")
const {RiotApi} = require('./src/services/riotApi')
const jsonQuery = require('json-query')
const express = require('express')

async function getTop5Champions(name) {
    const riotApi = new RiotApi()
    
    const id = await riotApi.getplayerIdByName(name)

    const result = await getChampionMastery(id)
    return result
}

async function getChampionMastery(id) {
    const riotApi = new RiotApi()
    const top5Ids = await riotApi.getTopUsedChampionsIds(id, 5)
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

const app = express()
const port = 3000

getTop5Champions('redpanda0129').then((result) => console.log(result))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/summoner/topChampions', async (req, res) => {
    res.send(await getTop5Champions('redpanda0129'))
})







