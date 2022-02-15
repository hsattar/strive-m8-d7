import app from '../app.js'
import supertest from 'supertest'
import mogoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const request = supertest(app)

describe('First Test', () => {
    it('Checking the GET / route', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
    })
})
