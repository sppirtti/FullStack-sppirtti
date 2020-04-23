import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState(``)
  const [password, setPassword] = useState(``)

  const [errorMessage, setErrorMessage] = useState(null)

  const [newBlog, setNewBlog] = useState(``)

  const [user, setUser] = useState(null)

  const [newUrl, setNewUrl] = useState(``)
  const [newAuthor, setNewAuthor] = useState(``)
  const [newTitle, setNewTitle] = useState(``)




  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user.id

    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })

    setNewUrl('')
    setNewTitle('')
    setNewAuthor('')
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }



  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in wiht: ',username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Login</h1>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div><p>{user.name} logged in</p>

          {blogForm()}
      }</div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App


/*
{blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      */