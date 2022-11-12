const axios = require('axios')

class RestClient {
    async get(url, options) {
        const result = await axios.get(url, options)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                const { status, statusText, data } = error.response
                return {
                    status,
                    statusText,
                    data
                }
            })
        return result
    }
}
module.exports.RestClient = RestClient