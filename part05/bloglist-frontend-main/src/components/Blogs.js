import Blog from './Blog.js'

const Blogs = (props) => {
    // let sortedBlogs = props.blogs.map(blog => blog).sort(function(a, b){return b.likes - a.likes})
    // console.log(sortedBlogs)

    return (
        <>
            <h2>blogs</h2>
            {
                props.blogs
                    .sort(function(a, b){return b.likes - a.likes})
                    .map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            username={props.username}
                            handleDeleteBlog={props.handleDeleteBlog}
                        />)
            }
        </>
    )
}

export default Blogs


