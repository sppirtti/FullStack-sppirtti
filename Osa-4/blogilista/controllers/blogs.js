const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/api/blogs', async (request, response) => {
    const body = request.body
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
})

module.exports = blogsRouter