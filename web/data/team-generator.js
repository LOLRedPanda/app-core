const data = require('./teams.json')

const newTeams = data.map((team) => {
    const {members} = team
    const {KDA, CSPM, DMGPM} = team.stats

    const newMembers = Object.keys(members).map((position) => {
        return {
            name: members[position],
            position,
            captain: false,
            KDA: KDA[position],
            CSPM: CSPM[position],
            DMGPM: DMGPM[position]
        }
    })

    return {
            id: team.id.toString(),
            name: team.name,
            logo: team.logo,
            members: newMembers,
            ranked: team.ranked,
            wins: team.wins,
            loses: team.loses
        }
})

console.log(JSON.stringify(newTeams, null, 2))

