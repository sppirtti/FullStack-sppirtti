const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB')
    })
    .catch((error) => {
        console.log('ERROR connecting to DB', error.message)
    })

    const blogSchema = mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number
    })

    blogSchema.set('toJSON', {
        transform: (document, returnedObject) => {
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
        }
      })

    module.exports = mongoose.model('Blog', blogSchema)