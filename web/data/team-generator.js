const fs = require('fs')
require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')

console.log('spreadsheetId', process.env.SPREADSHEET_ID.substring(0,10))

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)

async function auth() {
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	})
}

async function getPlayerStats() {
	await doc.loadInfo()
	const playerStatSheet = doc.sheetsByIndex[0]

	const rows = await playerStatSheet.getRows()
	const spreadsheetData = rows.map((row) => {
		const {
			playerId,
			teamId,
			playerName,
			position,
			captain,
			totalKills,
			totalDeaths,
			totalAssists,
			totalKDA,
			totalDMGPM,
			totalCSPM,
			totalMins,
		} = row

		return {
			id: playerId,
			teamId,
			name: playerName,
			position: position !== 'NULL' ? position : null,
			captain: captain === 'TRUE' ? true : false,
			kills: parseInt(totalKills),
			deaths: parseInt(totalDeaths),
			assists: parseInt(totalAssists),
			KDA: parseFloat(totalKDA),
			DMGPM: parseFloat(totalDMGPM),
			CSPM: parseFloat(totalCSPM),
			totalMins: parseFloat(totalMins),
		}
	})
	return spreadsheetData
}

async function getTeamStats() {
	await doc.loadInfo()
	const teamStatSheet = doc.sheetsByIndex[1]

	const rows = await teamStatSheet.getRows()
	const spreadsheetData = rows.map((row) => {
		const {
			teamId,
			teamName,
			logo,
			wins,
			losses,
			gWins,
			gLosses
		} = row

		return {
			id: teamId,
			name: teamName,
			logo,
			wins: parseInt(wins),
			losses: parseInt(losses),
			gWins: parseInt(gWins),
			gLosses: parseInt(gLosses)
		}
	})
	return spreadsheetData
}

async function buildData() {
	const playerStats = await getPlayerStats()
	const teamStats = await getTeamStats()
	const data = teamStats.map((team) => {
		const members = playerStats.filter((player) => player.teamId === team.id)
		team.members = members
		return team
	})
	return data
}

async function writeToFile() {
	const data = await buildData()
	const fs = require('fs');
	fs.writeFile('teams.json', JSON.stringify(data, null, 2), (err) => {
		if (err) throw err
		console.log('The file has been saved!')
	})
}

auth()
writeToFile()

// console.log(JSON.stringify(newTeams, null, 2))
