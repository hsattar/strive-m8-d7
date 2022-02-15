import { Router } from 'express'
import ProductsModel from './model.js'

const productsRouter = Router()

productsRouter.route('/')
.get(async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})
.post(async (req, res) => {
    try {
        const product = new ProductsModel(req.body)
        await product.save()
        res.status(201).send(product)
    } catch (error) {
        console.log(error);
    }
})

export default productsRouter