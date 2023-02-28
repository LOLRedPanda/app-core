import Team from "../models/team"
import { rank, winLossScore } from "../services/teamService"

describe("rank", () => {
  it("should sort by wins and losses", () => {
    const teamsData = [
      {
        id: "2",
        logo: "final_bastion.png",
        name: "Final Bastion",
        members: [],
        wins: 1,
        losses: 0,
        rank: 2,
        gWins: 10,
        score: 100,
      },
      {
        id: "1",
        logo: "NL.png",
        name: "Never Lucky",
        members: [],
        wins: 3,
        losses: 0,
        gWins: 5,
        rank: 1,
        score: 300,
      },
      {
        id: "3",
        logo: "CSU.png",
        name: "CSU",
        members: [],
        wins: 1,
        losses: 3,
        gWins: 3,
        rank: 3,
        score: 30,
      },
    ]

    const result = rank(teamsData)

    const expected: any = [{
      id: "1",
      logo: "NL.png",
      name: "Never Lucky",
      members: [],
      wins: 3,
      losses: 0,
      gWins: 5,
      rank: 1,
      score: 300,
    },
    {
      id: "2",
      logo: "final_bastion.png",
      name: "Final Bastion",
      members: [],
      wins: 1,
      losses: 0,
      gWins: 10,
      rank: 2,
      score: 100,
    },
    {
      id: "3",
      logo: "CSU.png",
      name: "CSU",
      members: [],
      wins: 1,
      losses: 3,
      gWins: 3,
      rank: 3,
      score: 30,
    },
    ]

    expect(result).toEqual(expected)
  })

  it("duplicate scores should have duplicate ranks", () => {
    const teamsData: Team[] = [
      {
        id: "1",
        name: "Never Lucky",
        logo: "NL.png",
        score: 300,
        wins: 3,
        losses: 0,
        gWins: 5,
        members: []
      },
      {
        id: "2",
        name: "Final Bastion",
        logo: "final_bastion.png",
        score: 300,
        wins: 3,
        losses: 0,
        gWins: 10,
        members: []
      }
    ]

    const result = rank(teamsData)

    const ranks = result.map((i) => i.rank)
    
    ranks.forEach((rank) => {
      expect(rank).toEqual(1)
    })
  })
})


describe("winLossScore", () => {
  it("should calculate a weighted score based on wins, losses, and gwins", () => {
    const fakeTeam: Team = {
        id: "1",
        name: "Never Lucky",
        logo: "NL.png",
        wins: 3,
        losses: 2,
        gWins: 5,
        members: []
    }

    const result = winLossScore(fakeTeam)
    expect(result).toEqual(300)
  })
})
