export default class TeamService {
    team: any

    constructor(team: any) {
        this.team = team
    }

    getCaptain(team: any) {
        const captain = team.find((member: any) => {
            console.log(member.name)
            if(member.captain === true) return member.name
        })
        return captain || 'foo'
    }

    winRate(wins: number, losses: number) {
        const totalPlayed = wins + losses
        const winRate = (wins / totalPlayed) * 100
        return winRate
    }

    winLossScore() {
        const {wins, loses} = this.team
        const winRate = this.winRate(wins, loses)
        const weight = wins
        const score = winRate * weight
        return score
    }
}

