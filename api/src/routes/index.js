const { PlayerController } = require('../controllers/player')
const { TeamController } = require('../controllers/team')
const { MatchesController } = require('../controllers/matches')
const { RiotApi } = require('../services/riotApi')
const { Database } = require('../services/database')


function Routes(app) {
	const db = new Database()

	app.post('/team', async (req, res) => {
		const team = new TeamController(db)
		try {
			const teamName = req.query.name
			const newTeam = {
				name: teamName
			}
			const data = await team.addTeam(newTeam)
			res.send(data)
		} catch (e) {
			console.log(e)
			res.send(e)
		}
	})

	app.get('/team', async (req, res) => {
		const team = new TeamController(db)
		try {
			const teamName = req.query.name
			const data = await team.getTeam(teamName)
			res.send(data)
		} catch (e) {
			console.log(e)
			res.send(e)
		}
	})

	// app.put('/team', async (req, res) => {
	// 	const db = new Database()
	// 	const team = new TeamController(db)
	// 	try {
	// 		const teamName = req.query.name
	// 		const newTeam = {
	// 			name: teamName
	// 		}
	// 		const data = await team.addTeam(newTeam)
	// 		res.send(data)
	// 	} catch (e) {
	// 		console.log(e)
	// 		res.send(e)
	// 	}
	// })

	app.delete('/team', async (req, res) => {
		const team = new TeamController(db)
		try {
			const teamName = req.query.name
			const data = await team.deleteTeam(teamName)
			res.send(data)
		} catch (e) {
			console.log(e)
			res.send(e)
		}
	})

	app.get('/player', async (req, res) => {
		const riotApi = new RiotApi()
		const player = new PlayerController(riotApi)
		try {
			const playerName = req.query.name
			const data = await player.getIdsByName(playerName)
			res.send(data)
		} catch (e) {
			console.log(e)
			res.send(e)
		}
	})

	app.get('/matches', async (req, res) => {
		const riotApi = new RiotApi()
		const match = new MatchesController(riotApi)
		const name = req.query.name
		const { puuid } = await match.getIdsByName(name)
		const matchId = await match.getMatchId(puuid)
		const participant = await match.getPlayerMatchHistory(matchId, puuid)
		res.send(participant)
	})
}

module.exports.Routes = Routes
