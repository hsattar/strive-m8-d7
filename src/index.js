import app from './app.js'
import mongoose from 'mongoose'

const { PORT, DB_URL } = process.env

mongoose.connect(`${DB_URL}/jest-production`, () => {
    console.log('Connect to DB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})