require('dotenv').config()
const express = require('express')
const { SummonerController } = require('./src/controllers/summoner')
const { RiotApi } = require('./src/services/riotApi')

const riotApi = new RiotApi()
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.get('/summoner/topChampions', async (req, res) => {
    const name = req.query.name;

    const summoner = new SummonerController(name, riotApi)
    res.send(await summoner.getTop5Champions(name))
})







