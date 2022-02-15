import { Router } from 'express'
import ProductsModel from './model.js'

const productsRouter = Router()

productsRouter.route('/')
.get(async (req, res) => {
    try {
        const products = await ProductsModel.find()
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})
.post(async (req, res) => {
    try {
        if (!req.body.name || !req.body.price ) return res.status(400).send('Invalid Prodct shape')
        const product = new ProductsModel(req.body)
        await product.save()
        res.status(201).send(product)
    } catch (error) {
        console.log(error)
    }
})

productsRouter.route('/:id')
.get(async (req, res) => {
    try {
        const products = await ProductsModel.findById(req.params.id)
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})

export default productsRouter