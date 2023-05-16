/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Blogs from './components/Blogs.js'
import Notification from './components/Notification.js'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm.js'
import BlogForm from './components/BlogForm.js'
import { addNewBlog, deleteBlog } from './services/blogs.js'
import Logged from './components/Logged.js'
import Togglable from './components/Toggable.js'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [notif, setNotif] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotif('Wrong login or password')
            setTimeout(() => {
                setNotif('')
            }, 3000)
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem(
            'loggedBlogAppUser'
        )
        setUser(null)
    }

    const handleAddBlog = (blogObject) => {
        console.log(blogObject)
        addNewBlog(blogObject, user.token)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
            })
        setNotif(`New blog ${title} added by ${author}`)
        setTimeout(() => {
            setNotif('')
        }, 3000)
    }

    const handleDeleteBlog = (blogObject) => {
        console.log(blogObject)
        deleteBlog(blogObject, user.token)
            .then(res => {
                setBlogs(blogs.filter(blog => blog !== blogObject))
            })
        setNotif(`Blog ${blogObject.title} deleted by ${user.username}`)
        setTimeout(() => {
            setNotif('')
        }, 3000)
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            // blogService.setToken(user.token)
        }
    }, [])

    return (
        <>
            <Notification
                message={notif}
            />
            {user === null &&
              <LoginForm
                  handleLogin={handleLogin}
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
              />
            }
            {user !== null &&
        <>
            <Logged
                user={user.username}
                handleLogout={handleLogout}
            />
            <Togglable buttonLabel='create new blog'>
                <BlogForm createBlog={handleAddBlog} />
            </Togglable>
            <Blogs
                blogs={blogs}
                username={user.username}
                handleDeleteBlog={handleDeleteBlog}
            />
        </>
            }
        </>
    )
}

export default App