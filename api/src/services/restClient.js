const axios = require('axios')

class RestClient {
    async get(url, options) {
        const result = await axios.get(url, options)
            .then((response) => {
                console.log(response.status)
                return response.data
            })
            .catch( async (error) => {
                console.log(error)
                const { status, headers } = error.response
                console.log(status)
                if(status === 429){
                    console.log(status)
                    const millisToSleep = this.millisToSleep(headers["retry-after"])
                    await this.sleep(millisToSleep)
                    const result = this.get(url, options)
                    return result.data
                }
                return error.response.data
                // }else{
                //     new Error(`could not complete request: ${error.response}`)
                // }

            })
        return result
    }

    async sleep(retryAfter) {
        setTimeout(() => console.log('waiting....', retryAfter), retryAfter)
    }

    millisToSleep(retryHeaderString){
        const millisToSleep = Math.round(parseFloat(retryHeaderString)*1000)
        return millisToSleep
    }
}

module.exports.RestClient = RestClient