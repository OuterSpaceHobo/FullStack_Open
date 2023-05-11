const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
let morgan = require('morgan')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
// const logger = require('./utils/logger')

morgan.token('data', function getData (req) {
    return JSON.stringify(req.body)
})

mongoose.set('strictQuery', false)

const mongoUrl = config.MONGODB_URI

console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl)

app.use(cors())
app.use(morgan(':method :url :response-time :data'))
app.use(express.json())

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app