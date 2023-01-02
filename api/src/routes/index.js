const { SummonerController } = require('../controllers/summoner')
const { MatchesController } = require('../controllers/matches')
const { RiotApi } = require('../services/riotApi')


function Routes(app) {
	const riotApi = new RiotApi()
	const summoner = new SummonerController(riotApi)
	const match = new MatchesController(riotApi)

	app.get('/summoner', async (req, res) => {
		try {
			const playerName = req.query.name
			const { id, puuid, name } = await summoner.getIdsByName(playerName)
			const rank = await summoner.getRank(id)
			const champs = await summoner.getChampionMastery(id)
			const matchIds = await summoner.getMatchIds(puuid)
			const CSPerMinute = await summoner.getCSPerMinute(matchIds, puuid)
			const data = {
				Username: name,
				Rank: rank,
				Top5ChampsByMastery: champs,
				CS: CSPerMinute
			}
			res.send(data)
		} catch (e){
			console.log(e)
			res.send(e)
		}
	})

	app.get('/matches', async (req, res) => {
		const name = req.query.name
		const {puuid} = await match.getIdsByName(name)
		const matchId = await match.getMatchId(puuid)
		const participant = await match.getPlayerMatchHistory(matchId, puuid)
		res.send(participant)
	})
}

module.exports.Routes = Routes