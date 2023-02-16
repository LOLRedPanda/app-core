import { rank, winLossScore } from "../services/teamService"

describe("rank", () => {
  it("should sort by wins and losses", () => {
    const teamsData = [
      {
        id: "1",
        name: "Never Lucky",
        logo: "NL.png",
        score: 300
      },
      {
        id: "2",
        name: "Final Bastion",
        logo: "final_bastion.png",
        score: 100
      },
      {
        id: "3",
        name: "CSU",
        logo: "CSU.png",
        score: 30
      }
    ]

    const result = rank(teamsData)

    const expected: any = [{
      id: "1",
      logo: "NL.png",
      name: "Never Lucky",
      rank: 1,
      score: 300,
    },
    {
      id: "2",
      logo: "final_bastion.png",
      name: "Final Bastion",
      rank: 2,
      score: 100,
    },
    {
      id: "3",
      logo: "CSU.png",
      name: "CSU",
      rank: 3,
      score: 30,
    },
    ]

    expect(result).toEqual(expected)
  })

  it("duplicate scores should have duplicate ranks", () => {
    const teamsData = [
      {
        id: "1",
        name: "Never Lucky",
        logo: "NL.png",
        score: 300
      },
      {
        id: "2",
        name: "Final Bastion",
        logo: "final_bastion.png",
        score: 300
      }
    ]

    const result = rank(teamsData)

    const ranks = result.map((i) => i.rank)

    ranks.forEach((r) => {
      expect(r).toEqual(1)
    })
  })
})


describe("winLossScore", () => {
  it("should calculate a weighted score based on wins and losses", () => {
    const fakeTeam = {
      id: "1",
      name: "Never Lucky",
      logo: "NL.png",

      wins: 3,
      loses: 2,
    }

    const result = winLossScore(fakeTeam)
    expect(result).toEqual(180)
  })
})
