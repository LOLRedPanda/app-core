export default interface player {
	id: string
	teamId: string
	name: string
	position: string | null
	captain: boolean
	kills: number
	deaths: number
	assists: number
	KDA: number
	CSPM: number
	DMGPM: number
	totalMins: number
}
