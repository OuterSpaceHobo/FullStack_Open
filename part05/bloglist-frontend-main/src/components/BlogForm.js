import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const handleAddNewBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            likes: 0
        })
    }

    return (
        <>
            <h2>create new blog</h2>
            <form onSubmit={handleAddNewBlog}>
                <div>
                title:
                    <input
                        type="text"
                        id='title'
                        value={title}
                        placeholder='write blog text here'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                author:
                    <input
                        type="text"
                        id='author'
                        value={author}
                        placeholder='write author here'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                url:
                    <input
                        type="text"
                        id='url'
                        value={url}
                        placeholder='write url here'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id='publish-button' type="submit">publish</button>
            </form>
        </>
    )
}

export default BlogForm