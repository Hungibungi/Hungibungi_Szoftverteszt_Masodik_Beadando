const client = require('./client')('localhost', 8000)

/**
 * Food is represented by a json with a following format
 * {'name':'name of the food', 'calories': 10 }
 * When a food is created it will get a randomly generated id 
 * and a food becomes
 * {'name':'name of the food', 'calories': 10, 'id': 'abcd1234' }
 */

describe('Food tests', () => {
    it('returns error 400 for missing food name', async () => {

        const postResponse = await client.post('/api/food', {'calories': 1})

        expect(postResponse.code).toBe(400)
    })
    it('returns error 400 for negative calories', async () => {

        const postResponse = await client.post('/api/food', {'calories': -1})

        expect(postResponse.code).toBe(400)
    })
    it('can return created foods and get 200 error', async () => {
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
    it('can read food and get 200 error', async () => {
        let pizza = {'name': 'pizza', 'calories': 1500}

        const postResponse = await client.post('/api/food', pizza)
        const pizzaId = JSON.parse(postResponse.body).id

        const getResponse = await client.get('/api/food/' + pizzaId)
        expect(getResponse.code).toBe(200)
        pizza.id = pizzaId

        const getResponseBody = JSON.parse(getResponse.body)
        expect(getResponseBody).toEqual(pizza)
    })
    it('returns error 404 for non-existent food with GET', async () => {
        const getResponse = await client.get('/api/food/alma')
        expect(getResponse.code).toBe(404)
    })
    it ('can update food and get 200 error', async () => {
        let barack = {'name': 'barack', 'calories': 100}

        const postResponse = await client.post('/api/food', barack)
        const barackId = JSON.parse(postResponse.body).id
        barack.id = barackId

        barack.name = 'Barack'
        barack.calories = 69
        const putResponse = await client.put('/api/food/' + barackId, barack)
        expect(putResponse.code).toBe(200)

        const getResponse = await client.get('/api/food/' + barackId)
        expect(getResponse.code).toBe(200)
        barack.id = barackId

        const getResponseBody = JSON.parse(getResponse.body)
        expect(getResponseBody).toEqual(barack)
    })
    it('returns error 404 for non-existent food with PUT', async () => {
        let alma = {'name': 'alma', 'calories': 80}
        const getResponse = await client.put('/api/food/alma', alma)
        expect(getResponse.code).toBe(404)
    })
})