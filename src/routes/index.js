const { SummonerController } = require('../controllers/summoner')
const { RiotApi } = require('../services/riotApi')


function Routes(app) {
    const riotApi = new RiotApi()

    app.get('/summoner/topChampions', async (req, res) => {
        const name = req.query.name;
        const id = await riotApi.getPlayerIdByName(name)
        const summoner = new SummonerController(name, riotApi)
        const rank = await summoner.getRank(id)
        const champs = await summoner.getChampionMastery(id)

        const data = "Username: " + name +
        "<br/>Rank: " + rank +
        "<br/>Top 5 Champs By Mastery: " + champs
        
        res.send(data)
    })
}

module.exports.Routes = Routes