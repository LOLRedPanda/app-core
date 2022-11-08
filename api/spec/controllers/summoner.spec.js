
const { createSpyFromClass } = require("jasmine-auto-spies")
const { SummonerController } = require("../../src/controllers/summoner")
const { RiotApi } = require("../../src/services/riotApi")
const { getMockParticipants } = require("../mocks/mockParticipants")

describe('SummonerController', () => {
    const mockRiotApi = createSpyFromClass(RiotApi)
    const fakePlayerId = 'NerdyLOLPlayer'
    let summoner

    const mockParticipants = getMockParticipants()

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

    describe('getCSPerMinute', () => {
        it('Should return the proper csPerMinute value on a participant pulled from a list', async () => {
            const fakePuuid = mockParticipants[1].puuid
            const result = await summoner.getCSPerMinute(fakePuuid, mockParticipants)
            const expected = 1.13
            expect(result).toEqual(expected)
        })
    })

    describe('getAllMatchesForPlayer', () => {
        it('Should return all of the player match stats from each match id', async () => {
            const fakeMatchIds = ['123', '456', '789']
            const mockParticipants1 = [
            {
                puuid: '1234',
                assist: 1
            },
            {
                puuid: 'the second puuid',
                assist: 2
            },
            {
                puuid: 'nerdyplayer',
                assist: 3
            },
            {
                puuid: 'homersimpson',
                assist: 4
            },
            {
                puuid: 'nerdyplayer',
                assist: 5
            },
            {
                puuid: 'nerdyplayer',
                assist: 6
            },
        ]

        const mockParticipants2 = [
            {
                puuid: '1234',
                assist: 7
            },
            {
                puuid: 'the second puuid',
                assist: 8
            },
            {
                puuid: 'nerdyplayer',
                assist: 9
            },
            {
                puuid: 'homersimpson',
                assist: 10
            },
            {
                puuid: 'nerdyplayer',
                assist: 11
            },
            {
                puuid: 'nerdyplayer',
                assist: 12
            },
        ]

        const mockParticipants3 = [
            {
                puuid: '1234',
                assist: 13
            },
            {
                puuid: 'the second puuid',
                assist: 14
            },
            {
                puuid: 'nerdyplayer',
                assist: 15
            },
            {
                puuid: 'homersimpson',
                assist: 16
            },
            {
                puuid: 'nerdyplayer',
                assist: 17
            },
            {
                puuid: 'nerdyplayer',
                assist: 18
            },
        ]
            const expected = [...mockParticipants1, ...mockParticipants2, ...mockParticipants3]
            mockRiotApi.getMatchParticipants.and.returnValues(mockParticipants1, mockParticipants2, mockParticipants3)
            const result = await summoner.getAllPlayersForAllMatches(fakeMatchIds)
            expect(result).toEqual(expected)
        })
    })

    describe('filterPlayersMatches', () => {
        it('should filter out a particular players match stats', async () => {
            const mockParticipants = [
                {
                    puuid: '1234',
                    assist: 1
                },
                {
                    puuid: 'the second puuid',
                    assist: 2
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 3
                },
                {
                    puuid: 'homersimpson',
                    assist: 4
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 5
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 6
                },
                {
                    puuid: '1234',
                    assist: 7
                },
                {
                    puuid: 'the second puuid',
                    assist: 8
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 9
                },
                {
                    puuid: 'homersimpson',
                    assist: 10
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 11
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 12
                },
                {
                    puuid: '1234',
                    assist: 13
                },
                {
                    puuid: 'the second puuid',
                    assist: 14
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 15
                },
                {
                    puuid: 'homersimpson',
                    assist: 16
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 17
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 18
                },
            ]

            const expected = [
                {
                    puuid: 'nerdyplayer',
                    assist: 3
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 5
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 6
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 9
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 11
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 12
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 15
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 17
                },
                {
                    puuid: 'nerdyplayer',
                    assist: 18
                }
            ]

            const result = await summoner.filterPlayersMatches('nerdyplayer', mockParticipants)
            expect(result).toEqual(expected)
        })
    })
})