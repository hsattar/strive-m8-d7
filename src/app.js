import express from "express"
import cors from 'cors'
import ProductsModel from './products/model.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World'))

app.use('/products', ProductsModel)

export default app