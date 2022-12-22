const axios = require('axios')

class RestClient {
    async get(url, options) {
        const result = await axios.get(url, options)
            .then((response) => {
                return response.data
            })
            .catch( async (error) => {
                const { status, statusText, headers } = error.response
                console.log(status)
                if(status === 403) {
                    throw new Error(`${status} ${statusText}: Did you forget to refresh your api key?`)
                }
                if(status === 429) {
                    const millisToSleep = this.millisToSleep(headers["retry-after"])
                    await this.sleep(millisToSleep)
                    const result = this.get(url, options)
                    return result.data
                }
               
            })
        return result
    }

    async sleep(retryAfter) {
        setTimeout(() => console.log('waiting to retry....', retryAfter), retryAfter)
    }

    millisToSleep(retryHeaderString){
        const millisToSleep = Math.round(parseFloat(retryHeaderString)*1000)
        return millisToSleep
    }
}

module.exports.RestClient = RestClient