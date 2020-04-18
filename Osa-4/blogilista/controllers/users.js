
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/api/users', async (request, response) => {

    const users = await User.find({}).populate('blogs', {author: 1, title: 1})
    response.json(users.map(users => users.toJSON()))
})

usersRouter.post('/api/users', async (req, res, next) => {
    const body = req.body

    if (body.password.length < 3) {
        return res.status(400).json({
            error: 'Password too short, minimum 3 characters!'
        })
    }


    const SaltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, SaltRounds)

    const user = new User({
        username: body.username,
        password: body.password,
        name: body.name
    })
    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (error) {
        next(error)
    }

})

module.exports = usersRouter