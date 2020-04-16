
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')

app.use(cors())
app.use(express.json())

const Blog = require('./models/blog')

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
           response.json(blogs.map(blog => blog.toJSON())) 
        })
            
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})