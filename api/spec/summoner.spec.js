
const { createSpyFromClass } = require("jasmine-auto-spies")
const { SummonerController } = require("../src/controllers/summoner")
const { RiotApi } = require("../src/services/riotApi")

describe('SummonerController', () => {
    const mockRiotApi = createSpyFromClass(RiotApi)
    const fakePlayerId = 'NerdyLOLPlayer'
    let summoner

    beforeAll(() => {
        summoner = new SummonerController(fakePlayerId, mockRiotApi)
    })

    describe('getChampionMastery', () => {
        it('should return the top 5 champion names of the player', async () => {
            const mockChampionIds = [ 81, 202, 145, 222, 22 ]
            mockRiotApi.getTopUsedChampionsIds.and.returnValue(mockChampionIds)

            const result = await summoner.getChampionMastery(fakePlayerId)
            const expected = ["Ezreal","Jhin","Kai'Sa","Jinx","Ashe"]
            expect(result).toEqual(expected)
        })
    })
})