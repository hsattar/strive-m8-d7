import { Router } from 'express'
import ProductsModel from './model.js'

const productsRouter = Router()

// RANDOM COMMENT

productsRouter.route('/')
.get(async (req, res) => {
    try {
        const products = await ProductsModel.find()
        res.send(products)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
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
        res.sendStatus(500)
    }
})

productsRouter.route('/:id')
.get(async (req, res) => {
    try {
        const product = await ProductsModel.findById(req.params.id)
        if (!product) return res.status(404).send()
        res.send(product)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})
.put(async (req, res)=> {
    try {
        const product = await ProductsModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!product) return res.sendStatus(404)
        res.send(product)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})
.delete(async (req, res) => {
    try {
        const product = await ProductsModel.findByIdAndDelete(req.params.id)
        if (!product) return res.sendStatus(404) 
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

export default productsRouter