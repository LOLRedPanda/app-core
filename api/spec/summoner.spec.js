
const { createSpyFromClass } = require("jasmine-auto-spies")
const { SummonerController } = require("../src/controllers/summoner")
const { RiotApi } = require("../src/services/riotApi")
const { getMockParticipants } = require("./mocks/mockParticipants")

describe('SummonerController', () => {
    const mockRiotApi = createSpyFromClass(RiotApi)
    const fakePlayerId = 'NerdyLOLPlayer'
    let summoner

    const mockParticipants = getMockParticipants()

    beforeAll(() => {
        summoner = new SummonerController(mockRiotApi)
    })

    fdescribe('getChampionMastery', () => {
        it('should return the top 5 champion names of the player', async () => {
            const mockChampionIds = [ {
                championId: 81,
                
              },
              {
                championId: 202,
                
              },
              {
                championId: 145,
                
              },
              {
                championId: 222,
                
              },
              {
                championId: 22,
                
              }]
            mockRiotApi.getChampionMastery.and.returnValue(mockChampionIds)

            const result = await summoner.getChampionMastery(fakePlayerId)
            const expected = ["Ezreal","Jhin","Kai'Sa","Jinx","Ashe"]
            expect(result).toEqual(expected)
        })
    })

    describe('getAverageCSPerMinute', () => {
        const mockMatchStats = [
            {
                puuid: 'nerdyplayer',
                assist: 3,
                totalMinionsKilled: 1,
                timePlayed: 1
            },
            {
                puuid: 'nerdyplayer',
                assist: 5,
                totalMinionsKilled: 2,
                timePlayed: 1
            },
            {
                puuid: 'nerdyplayer',
                assist: 6,
                totalMinionsKilled: 4,
                timePlayed: 1
            },
            {
                puuid: 'nerdyplayer',
                assist: 9,
                totalMinionsKilled: 5,
                timePlayed: 1
            },
            {
                puuid: 'nerdyplayer',
                assist: 11,
                totalMinionsKilled: 6,
                timePlayed: 1
            },
            {
                puuid: 'nerdyplayer',
                assist: 12,
                totalMinionsKilled: 7,
                timePlayed: 1
            },
            {
                puuid: 'nerdyplayer',
                assist: 15,
                totalMinionsKilled: 8,
                timePlayed: 1
            },
            {
                puuid: 'nerdyplayer',
                assist: 17,
                totalMinionsKilled: 9,
                timePlayed: 1
            },
            {
                puuid: 'nerdyplayer',
                assist: 18,
                totalMinionsKilled: 10,
                timePlayed: 1
            }
        ]
        it('Should return the average csPerMinute value on a participant based on a list of match statt', async () => {
            const result = await summoner.calculateAverageCSPerMinute(mockMatchStats)
            const expected = 347
            expect(result).toEqual(expected)
        })
    })

    describe('getAllPlayersForAllMatches', () => {
        it('Should return the match stats of all players from the given matchIDs', async () => {
            const fakeMatchIds = ['123', '456', '789']
            const mockParticipants1 = {"info": {
                "participants": [
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
            }
        ]}}

        const mockParticipants2 = {"info": {

            "participants": [
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
        ]}}

        const mockParticipants3 = { "info": {
            "gameCreation": 1666931095854,
            "participants": [
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
        ]}}
            const expected = [
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
            //console.log(mockRiotApi)
            mockRiotApi.getMatch.and.returnValues(mockParticipants1,mockParticipants2,mockParticipants3)
            const result = await summoner.getAllPlayersForAllMatches(fakeMatchIds)
            console.log(result)
            console.log(expected)
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