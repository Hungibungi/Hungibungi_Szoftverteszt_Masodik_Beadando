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
    it('can return created foods', async () => {
        let torta = {'name': 'torta', 'calories': 1200}
        let pacal = {'name': 'pacal', 'calories': 1800}

        const tortaResponse = await client.post('/api/food', torta)
        const tortaId = JSON.parse(tortaResponse.body).id
        const pacalResponse = await client.post('/api/food', pacal)
        const pacalId = JSON.parse(pacalResponse.body).id

        const getResponse = await client.get('/api/food')
        expect(getResponse.code).toBe(200)

        const getResponseBody = JSON.parse(getResponse.body)
        torta.id = tortaId
        pacal.id = pacalId

        expect(getResponseBody).toContainEqual(torta)
        expect(getResponseBody).toContainEqual(pacal)
    })
    it('can read food', async () => {
        const pizza = {'name': 'pizza', 'calories': 1500}

        const postResponse = await client.post('/api/food', pizza)
        const pizzaId = JSON.parse(postResponse.body).id

        const getResponse = await client.get('/api/food/' + pizzaId)
        expect(getResponse.code).toBe(200)
        pizza.id = pizzaId

        const getResponseBody = JSON.parse(getResponse.body)
        expect(getResponseBody).toEqual(pizza)
    })
    it('returns error for non-existent food', async () => {
        const getResponse = await client.get('/api/food/alma')
        expect(getResponse.code).toBe(404)
    })
})