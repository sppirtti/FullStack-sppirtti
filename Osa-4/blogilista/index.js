const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())


const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})



const Blog = mongoose.model('Blog', blogSchema)
console.log('SALASANA PUUTTUU')
const mongoUrl = 'mongodb+srv://sppirtti:SALASANA@cluster0-pkxno.mongodb.net/blogilista-app?retryWrites=true&w=majority'

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

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

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})