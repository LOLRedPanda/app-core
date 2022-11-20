const axios = require('axios')

class RestClient {
    async get(url, options) {
        const result = await axios.get(url, options)
            .then((response) => {
                return response.data
            })
            .catch( async (error) => {
                const { status, statusText, data } = error.response
                if(status === 429){
                    console.log("429")
                    console.log('sleep')
                    await sleep(2000)
                    const {status, statusText,data} = this.get(url, options)
                    return {
                        status,
                        statusText,
                        data
                    }
                }
                
                return {
                    status,
                    statusText,
                    data
                }
            })
        return result
    }

    async sleep(retryAfter) {
        setTimeout(() => console.log('waiting....'), retryAfter)
    }
}

module.exports.RestClient = RestClient