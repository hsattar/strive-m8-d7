import app from '../app.js'
import supertest from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const request = supertest(app)
const { DB_URL } = process.env

describe('Testing Product Routes - CRUD Functionality', () => {

    beforeAll(done => {
        mongoose.connect(`${DB_URL}/jest-test`, () => {
            console.log('Connect to DB')
            done()
        })
    })

    afterAll((done) => {
        mongoose.connection.close().then(() => done())
    })
    

    let productId
    const newProduct = { name: 'Test Product', price: 100 }
    const invalidProduct = { name: 'Invalid' }
    const modifiedProduct = { price: 123 }

    it('Should get all the products', async () => {
        const response = await request.get('/products')
        expect(response.status).toBe(200)
    })
    
    it('Should return status of 400 if you add an invalid product', async () => {
        const response = await request.post('/products').send(invalidProduct)
        expect(response.status).toBe(400)
    })

    it('should add a new product', async () => {
        const response = await request.post('/products').send(newProduct)
        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()
        productId = response.body._id
    })

    it("should check that the GET /products/:id returns a 404 without a valid id", async () => {
        const response = await request.get(`/products/999999999999999999999999`)
        expect(response.status).toBe(404)
    })

    it('Should be able to get a specific product by id', async () => {
        const response = await request.get(`/products/${productId}`)
        expect(response.status).toBe(200)
        expect(response.body._id).toBe(productId)
        expect(response.body.name).toBe(newProduct.name)
        expect(response.body.price).toBe(newProduct.price)
    })

    it("should check that the GET /products/:id returns a 404 without a valid id", async () => {
        const response = await request.get(`/products/999999999999999999999999`)
        expect(response.status).toBe(404)
    })

    it ('Should be able to edit a product', async () => {
        const response = await request.put(`/products/${productId}`).send(modifiedProduct)
        const modifiedPriceType = typeof(modifiedProduct.price)
        expect(response.status).toBe(200)
        expect(modifiedPriceType).toBe('number')
        expect(response.body.price).toBe(modifiedProduct.price)
    })

    it("should check that the GET /products/:id returns a 404 without a valid id", async () => {
        const response = await request.get(`/products/999999999999999999999999`)
        expect(response.status).toBe(404)
    })

    it('should return a status of 204 when deleting a product', async () => {
        const response = await request.delete(`/products/${productId}`)
        expect(response.status).toBe(204)
    })

})
