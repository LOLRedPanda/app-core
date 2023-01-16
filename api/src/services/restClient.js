class RestClient {
	constructor(request) {
		this.request = request
	}
	async get(url, options) {
		let result
		try {
			result = await this.request.get(url, options)
			if (result.status == 200) {
				return result.data
			}
		} catch (e) {
			const { status, statusText, headers } = e.response
			if (status === 403) {
				throw new Error(`${status} ${statusText}: Did you forget to refresh your api key?`)
			}
			if (status === 429) {
				const millisToSleep = this.millisToSleep(headers['retry-after'])
				await this.sleep(millisToSleep)
				result = await this.get(url, options)
				if (result.status === 200) return result.data
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
