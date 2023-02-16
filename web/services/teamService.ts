
function winRate(wins: number, losses: number) {
    const totalPlayed = wins + losses
    const winRate = (wins / totalPlayed) * 100
    return winRate
}

export function winLossScore(team: any) {
    const { wins, loses } = team
    const rate = winRate(wins, loses)
    const weight = wins
    const score = rate * weight
    return score
}

export function rank(teams: any) {
    const sortedByScore = teams.sort((a: any, b: any) => {
        if (a.score !== b.score) {
            if (a.score > b.score)
                return -1
        }
        return 0
    });

    const groupedByRank = [[sortedByScore[0]]]
    sortedByScore.slice(1).forEach((e: any, i: any) => {
        if (e.score == sortedByScore[i].score) {
            groupedByRank[groupedByRank.length - 1].push(e);
        } else {
            groupedByRank.push([e]);
        }
    });

    const rankedLeague = groupedByRank.flatMap((group, i) => {
        const rankedTeams = group.map((team) => {
            return {...team, rank: i + 1}
        })
        return rankedTeams
    })


    return rankedLeague
}

