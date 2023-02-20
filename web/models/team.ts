import player from "./player"

export default interface Team {
    id: string
    name: string
    logo: string
    members: player[]
    wins: number
    gWins : number
    losses: number
    score?: number
    rank?: number
}
