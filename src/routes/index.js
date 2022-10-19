const { SummonerController } = require('../controllers/summoner')
const { RiotApi } = require('../services/riotApi')


function Routes(app) {
    const riotApi = new RiotApi()

    app.get('/summoner/topChampions', async (req, res) => {
        const name = req.query.name;
        const summoner = new SummonerController(name, riotApi)
        res.send(await summoner.getTop5Champions(name))
    })
}

module.exports.Routes = Routes