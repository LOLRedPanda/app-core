const axios = require('axios')
const { RestClient } = require("../src/services/restClient")
//mockaxios

describe('RestClient', () => {
//  const axiosSpy = createSpy()
//  let client
//     beforeAll(() => {
//         client = new RestClient()
//     })

//     fdescribe('get', () => {
        describe('get', () => {
            it('Should return a result on success', async () => {
                //spyOn(axios, 'get').and.resolveWith({ data:{status:200} })
            })
        })
        //it('Should return a result on success', async () => {
        //     spyOn(axios, 'get').andResolveTo({ data:{status:200} })
        //    const result = client.get('fake url', {})
        //   //expect responce.data.status
        //   expect(result).toEqual({status:200})
        //})
        // it('if it is a 403 it should return an error', async () => {
        //   //have mock axois return 403 
        //   //expect function
        // })
        // it('if it is a 429 should retry and sleep', async () => {
        //   //have mock axois return 429 
        //   //expect error
        // })
    //})
})