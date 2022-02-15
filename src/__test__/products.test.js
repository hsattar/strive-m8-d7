import app from '../app.js'
import supertest from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const request = supertest(app)
const { DB_URL } = process.env

describe('First Test', () => {

    beforeAll(done => {
        mongoose.connect(`${DB_URL}/jest-test`, () => {
            console.log('Connect to DB')
            done()
        })
    })

    afterAll(done => {
        // await mongoose.connection.dropDatabase()
        // mongoose.connection.close()
        done()
    })

    const newProduct = { name: 'Test Product', price: 100 }

    it('should add a new product', async () => {
        const response = await request.post('/products').send(newProduct)
        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()
    })
})
