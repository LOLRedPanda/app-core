import team from '../models/team'

function winRate(wins: number, losses: number): number {
	const totalPlayed = wins + losses
	const winRate = (wins / totalPlayed) * 100
	return winRate
}

export function winLossScore(team: team): number {
	const { wins, losses, gWins } = team
	const rate = winRate(wins, losses)
	const weight = gWins
	const score = rate * weight
	return score
}

export function rank(teams: team[]) {
	const sortedByScore = teams.sort((a: team, b: team) => {
		if (a.score !== b.score) {
			if (a.score !== undefined && b.score !== undefined && a.score > b.score)
				return -1
		}
		return 0
	})

	const groupedByRank = [[sortedByScore[0]]]
	sortedByScore.slice(1).forEach((t: team, i: number) => {
		if (t.score == sortedByScore[i].score) {
			groupedByRank[groupedByRank.length - 1].push(t)
		} else {
			groupedByRank.push([t])
		}
	})

	const rankedLeague = groupedByRank.flatMap((group, i) => {
		const rankedTeams = group.map((team) => {
			return { ...team, rank: i + 1 }
		})
		return rankedTeams
	})

	return rankedLeague
}
