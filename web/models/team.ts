export default interface Team {
    id: string
    name: string
    logo: string
    members: object[]
    wins: number
    losses: number
    score?: number
    rank?: number
}
