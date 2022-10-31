const fs = require("fs")

class Champions {
    constructor() {
        const jsonString = fs.readFileSync("./static-data/champions.json", "utf-8")
        const rawData = JSON.parse(jsonString)
        this.championData = rawData.data
    }

    getChampions() {
        return this.championData
    }
}

module.exports.Champions = Champions