const client = require('./client')('localhost', 8000)

/**
 * Food is represented by a json with a following format
 * {'name':'name of the food', 'calories': 10 }
 * When a food is created it will get a randomly generated id 
 * and a food becomes
 * {'name':'name of the food', 'calories': 10, 'id': 'abcd1234' }
 */

describe('Food tests', () => {
    it('returns error for missing food name', async () => {

        const postResponse = await client.post('/api/food', {'calories': 1})

        expect(postResponse.code).toBe(400)
    })
    it('returns error for negative calories', async () => {

        const postResponse = await client.post('/api/food', {'calories': -1})

        expect(postResponse.code).toBe(400)
    })
})