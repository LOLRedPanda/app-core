const data = require('./teams.json')
require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')

const doc = new GoogleSpreadsheet(
	'1AcxvdJG0Yf9nDe-MuYBtnOvAPUf04T0PwZKWxPXs45w'
)
async function auth() {
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	})

	await doc.loadInfo()

	const sheet = doc.sheetsByIndex[0]

	const rows = await sheet.getRows()
	const spreadsheetData = rows.map((row) => {
		const {
			playerId,
			teamId,
			teamName,
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
			playerId,
			teamId,
			teamName,
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
		}
	})
}

auth()

const newTeams = spreadsheetData.map((team) => {
	const { members } = team
	const { KDA, CSPM, DMGPM } = team.stats

	const newMembers = Object.keys(members).map((position) => {
		return {
			name: members[position],
			position,
			captain: false,
			KDA: KDA[position],
			CSPM: CSPM[position],
			DMGPM: DMGPM[position],
		}
	})

	return {
		id: team.id.toString(),
		name: team.name,
		logo: team.logo,
		members: newMembers,
		ranked: team.ranked,
		wins: team.wins,
		loses: team.loses,
	}
})

// console.log(JSON.stringify(newTeams, null, 2))
