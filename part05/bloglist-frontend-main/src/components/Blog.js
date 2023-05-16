import { useState } from 'react'
import { addNewLike } from '../services/blogs.js'

const Blog = ({ blog, username, handleDeleteBlog, mock }) => {
    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(0)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setLikes(blog.likes)
        setVisible(!visible)
    }

    const toggleIncrementLike = (blog) => {
        if (mock !== undefined) {
            console.log('mock', mock)
            mock()
        } else {
            console.log('blog', blog)

            const newBlog = {
                id: blog.id,
                title: blog.title,
                likes: ++blog.likes,
                author: blog.author,
                url: blog.url,
                user: blog.user
            }

            console.log('newBlog', newBlog)
            console.log('username', username)
            addNewLike(newBlog, username)
            setLikes(newBlog.likes)
        }
    }

    const toggleDeleteBlog = () => {
        window.confirm(`Remove blog ${blog.title}?`)
        handleDeleteBlog(blog)
    }

    return (
        <div className='blog' style={blogStyle}>
            <div style={hideWhenVisible}>
                {blog.title} {blog.author}
                <button
                    id='show-button'
                    onClick={toggleVisibility}>
                        show
                </button>
            </div>
            <div className='full_blog'style={showWhenVisible}>
                <div>{blog.title}
                    <button
                        onClick={toggleVisibility}>
                            hide
                    </button>
                </div>
                <div>{blog.author}</div>
                <div>{blog.url}</div>
                <div>{username}</div>
                <div id='likes'>{likes}
                    <button
                        id='like-button'
                        onClick={() => toggleIncrementLike(blog)}>
                            like
                    </button>
                </div>
                {username === blog.user.username &&
                <div>
                    <button
                        id='delete-button'
                        onClick={() => toggleDeleteBlog(blog)}>
                            remove
                    </button>
                </div>
                }
            </div>
        </div>
    )
}

export default Blog