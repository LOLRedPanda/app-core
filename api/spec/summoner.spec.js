
const { createSpyFromClass } = require("jasmine-auto-spies")
const { SummonerController } = require("../src/controllers/summoner")
const { RiotApi } = require("../src/services/riotApi")
const { matchData } = require("./mocks/mockMatchData")

describe('SummonerController', () => {
    const mockRiotApi = createSpyFromClass(RiotApi)
    const fakePlayerId = 'NerdyLOLPlayer'
    let summoner
    let mockMatches

    beforeAll(() => {
        mockMatches = matchData
        summoner = new SummonerController(mockRiotApi)
    })

    describe('getChampionMastery', () => {
        it('should return the top 5 champion names of the player', async () => {
            const mockChampionIds = [
                {championId: 81},
                {championId: 202},
                {championId: 145},
                {championId: 222},
                {championId: 22}
            ]
            mockRiotApi.getChampionMastery.and.returnValue(mockChampionIds)

            const result = await summoner.getChampionMastery(fakePlayerId)
            const expected = ["Ezreal","Jhin","Kai'Sa","Jinx","Ashe"]
            expect(result).toEqual(expected)
        })
    })

    describe('getAverageCSPerMinute', () => {
        const mockMatchStats = [
            {totalMinionsKilled: 1, timePlayed: 1},
            {totalMinionsKilled: 2, timePlayed: 1},
            {totalMinionsKilled: 4, timePlayed: 1},
            {totalMinionsKilled: 5, timePlayed: 1},
            {totalMinionsKilled: 6, timePlayed: 1},
            {totalMinionsKilled: 7, timePlayed: 1},
            {totalMinionsKilled: 8, timePlayed: 1},
            {totalMinionsKilled: 9, timePlayed: 1},
            {totalMinionsKilled: 10,timePlayed: 1}
        ]

        it('Should return the average csPerMinute value on a participant based on a list of match stats', async () => {
            const result = await summoner.calculateAverageCSPerMinute(mockMatchStats)
            const expected = 347
            expect(result).toEqual(expected)
        })
    })

    describe('getAllPlayersForAllMatches', () => {
        it('Should return the match stats of all players from the given matchIDs', async () => {
            const fakeMatchIds = ['123', '456', '789']
            const mockMatchData1 = mockMatches
            const mockMatchData2 = {info: {...mockMatches.info, participants:  [
                {puuid: '1234',assists: 7},
                {puuid: 'the second puuid', assists: 8},
                {puuid: 'nerdyplayer', assists: 9},
                {puuid: 'homersimpson',assists: 10},
                {puuid: 'nerdyplayer', assists: 11},
                {puuid: 'nerdyplayer', assists: 12},
            ]}}
            const mockMatchData3 = {info: {...mockMatches.info, participants: [
                {puuid: '1234',assists: 13},
                {puuid: 'the second puuid', assists: 14},
                {puuid: 'nerdyplayer', assists: 15},
                {puuid: 'homersimpson', assists: 16},
                {puuid: 'nerdyplayer', assists: 17},
                {puuid: 'nerdyplayer', assists: 18},
            ]}}

            mockRiotApi.getMatch.and.returnValues(mockMatchData1, mockMatchData2, mockMatchData3)
            const result = await summoner.getAllPlayersForAllMatches(fakeMatchIds)
            const expected = [...mockMatchData1.info.participants, ...mockMatchData2.info.participants, ...mockMatchData3.info.participants]
            expect(result).toEqual(expected)
        })
    })

    describe('filterPlayersMatches', () => {
        it('should filter out a particular players match stats', async () => {
            const mockParticipants = [
                {puuid: 'nerdyplayer', assist: 3},
                {puuid: 'homersimpson', assist: 4},
                {puuid: 'nerdyplayer', assist: 5},
                {puuid: '1234', assist: 7},
                {puuid: 'the second puuid', assist: 8},
                {puuid: 'homersimpson', assist: 10},
            ]

            const expected = [
                {puuid: 'nerdyplayer', assist: 3},
                {puuid: 'nerdyplayer', assist: 5}
            ]

            const result = await summoner.filterPlayersMatches('nerdyplayer', mockParticipants)
            expect(result).toEqual(expected)
        })
    })
})