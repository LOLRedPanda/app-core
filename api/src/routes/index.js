const { SummonerController } = require('../controllers/summoner')
const { MatchesController } = require('../controllers/matches')
const { RiotApi } = require('../services/riotApi')


function Routes(app) {
    const riotApi = new RiotApi()

    app.get('/summoner', async (req, res) => {
        const name = req.query.name;
        const id = await riotApi.getPlayerIdByName(name)
        const puuid = await riotApi.getPlayerPuuIdByName(name)
        const summoner = new SummonerController(name, riotApi)
        const rank = await summoner.getRank(id)
        const champs = await summoner.getChampionMastery(id)
        const matchId = await summoner.getMatchId(puuid)
        //const matchData = await summoner.getPlayerMatchHistory(matchId, puuid)
        const CSPerMinute = await summoner.getCSPerMinute(puuid, matchId)
        const data = {
        Username:name, 
        Rank:rank,
        Top5ChampsByMastery:champs,
        CS: CSPerMinute
        }
        
        res.send(data)
    })

    app.get('/matches', async (req, res) => {
        const name = req.query.name;
        const puuid = await riotApi.getPlayerPuuIdByName(name)
        const match = new MatchesController(riotApi)
        const matchId = await match.getMatchId(puuid)
        const participant = await match.getPlayerMatchHistory(matchId, puuid)
        res.send(participant)
    })
}

module.exports.Routes = Routes