
const { createSpyFromClass } = require('jasmine-auto-spies')
const { PlayerController } = require('../src/controllers/player')
const { RiotApi } = require('../src/services/riotApi')
const { mockSummoner } = require('./mocks/mockSummoner')

describe('SummonerController', () => {
	const mockRiotApi = createSpyFromClass(RiotApi)
	const fakePlayerId = 'NerdyLOLPlayer'
	let player

	beforeEach(() => {
		mockRiotApi.getPlayerIdsByName.and.resolveTo(mockSummoner)
		player = new PlayerController(mockRiotApi)
	})

	describe('getIdsByName', () => {
		it('should return ids of summoner', async () => {
			const result = await player.getIdsByName(fakePlayerId)

			console.log(result)

			const expected = {
				summonerId: mockSummoner.id,
				puuid: mockSummoner.puuid,
				name: mockSummoner.name,
				accountId: mockSummoner.accountId
			}
			expect(result).toEqual(expected)
		})
	})
})


