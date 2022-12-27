
class RestClient {
    constructor(request) {
        this.request = request
    }
    async get(url, options) {
        try {
            const result = await this.request.get(url, options)
            if (result.data.status == 200) {
                return result.data
            }
        } catch (e) {
            console.log(e)
            const { status, statusText, headers } = e.response
            console.log(status)
            if (status === 403) {
                console.log('foo')
                throw new Error(`${status} ${statusText}: Did you forget to refresh your api key?`)
            }
            if (status === 429) {
                const millisToSleep = this.millisToSleep(headers["retry-after"])
                await this.sleep(millisToSleep)
                const result = this.get(url, options)
                return result.data
            }
        }
        return result
    }

    async sleep(retryAfter) {
        setTimeout(() => console.log('waiting to retry....', retryAfter), retryAfter)
    }

    millisToSleep(retryHeaderString) {
        const millisToSleep = Math.round(parseFloat(retryHeaderString) * 1000)
        return millisToSleep
    }
}

module.exports.RestClient = RestClient