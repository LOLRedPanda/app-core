const axios = require('axios')

class Req{
	async get(url, options){
		return await axios.get(url, options)
	}
}

module.exports.Req = Req