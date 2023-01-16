const { Req } = require('../src/services/request')
const { RestClient } = require('../src/services/restClient')
const { createSpyFromClass } = require('jasmine-auto-spies')
//mockaxios

describe('RestClient', () => {
	const mockRequest = createSpyFromClass(Req)
	let client
	beforeAll(() => {
		client = new RestClient(mockRequest)
	})

	describe('get', () => {
		it('Should return a result on success', async () => {
			mockRequest.get.and.returnValue({status:200, data:{}})
			const result = await client.get('https://www.string.com', {})

			expect(result).toEqual({})
		})

		it('if it is a 403 it should return an error', async () => {
			mockRequest.get.and.throwError({response:{status:403, statusText:'statustext', headers:{}}})
			let error
			try{
				await client.get('https://www.string.com', {})
			}catch(e){
				error = e
			}

			expect(error).toEqual(new Error('403 statustext: Did you forget to refresh your api key?'))
		})

		it('if it is a 429 should retry and sleep', async () => {
			mockRequest.get.and.throwError({response:{status:429, statusText:'statustext', headers:{'retry-after': 2}}})
			mockRequest.get.and.returnValue({status:200, data:{}})

			const result = await client.get('https://www.string.com', {})

			expect(result).toEqual({})

		})
            
	})

})
