const { createSpyFromClass } = require('jasmine-auto-spies')
const { MatchesController } = require('../src/controllers/matches')
const { RiotApi } = require('../src/services/riotApi')
const { matchData } = require('./mocks/mockMatchData')

describe('MatchesController', () => {
	const mockRiotApi = createSpyFromClass(RiotApi)
	const fakeMatchId = 'fakeMatchId'
	let mockMatchData
	let match
	beforeAll(() => {
		mockMatchData = matchData
		match = new MatchesController(mockRiotApi)
	})

	describe('getPlayerMatchHistory', () => {
		it('should return the correct participant data', async () => {
			mockRiotApi.getMatch.and.returnValue(mockMatchData)
			const fakeParticipant = mockMatchData.info.participants[1]
			const result = await match.getPlayerMatchHistory(fakeMatchId, fakeParticipant.puuid)

			const kda = (fakeParticipant.kills + fakeParticipant.assists)/fakeParticipant.deaths
			const Time = fakeParticipant.timePlayed/60
			const expectedTime = Math.ceil(Time * 100) / 100
			const expectedKDA = Math.ceil(kda * 100) / 100
			const expected = {
				puuid: fakeParticipant.puuid,
				championId: fakeParticipant.championId,
				kills: fakeParticipant.kills,
				deaths: fakeParticipant.deaths,
				assists: fakeParticipant.assists,
				KDA: expectedKDA,
				time: expectedTime
			}

			expect(result).toEqual(expected)
		})

		it('should return an error message if no player history is found', async () => {
			mockRiotApi.getMatch.and.returnValue(mockMatchData)
			const nonExistentPlayerId = 'I do not exist'
			const result = await match.getPlayerMatchHistory(fakeMatchId, nonExistentPlayerId)

			expect(result).toEqual(`PUUID: ${nonExistentPlayerId} does not exist for match: ${fakeMatchId}`)
		})
	})
})
