const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB')
    })
    .catch((error) => {
        console.log('ERROR connecting to DB', error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter) 
app.use(middleware.errorHandler)


module.exports = app
