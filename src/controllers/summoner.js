async function getTop5Champions(name) {
    const riotApi = new RiotApi()
    
    const id = await riotApi.getplayerIdByName(name)

    const result = await getChampionMastery(id)
}

async function getChampionMastery(id) {
    const riotApi = new RiotApi()
    const top5Ids = await riotApi.getTopUsedChampionsIds(id, 5)
    const jsonString = fs.readFileSync("./static-data/champions.json", "utf-8")
    const rawData = JSON.parse(jsonString)
    const championData = rawData.data
    const top5Names = []
    top5Ids.forEach(
        (id) => {
            const {name} = jsonQuery(`[**][key=${id}]`, {data: championData}).value
            top5Names.push(name)
        }
    )
    console.log(top5Names)
    return top5Names
}