const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name :1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/api/blogs', async (request, response) => {

    const body = request.body
    const user = await User.findById(body.userId)
  
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
   
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
    
})

blogsRouter.delete('/api/blogs/:id', async (req, res, next) => {
    try {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/api/blogs/:id', async (req, res, next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.json(updatedBlog => updatedBlog.toJSON)
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter