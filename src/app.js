import express from "express"
import cors from 'cors'
import productsRouter from './products/index.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World'))

app.use('/products', productsRouter)

export default app