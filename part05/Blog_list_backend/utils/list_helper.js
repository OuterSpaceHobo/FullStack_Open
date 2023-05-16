const dummy = (blogs) => {
    console.log(blogs)
    return 1
}
  
const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    console.log(blogs)
    const likesSum = blogs.map(item => item.likes).reduce((prev, next) => prev + next)
    return likesSum
}

const favoriteBlog = (blogs) => {
    const topLikes = blogs.map(item => item.likes).reduce((prev, next) => Math.max(prev, next))
    console.log('topLikes', topLikes)
    const topBlog = blogs.find(blog => blog.likes === topLikes)
    console.log('topBlog', topBlog)
    return {
        title: topBlog.title,
        author: topBlog.author,
        likes: topBlog.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    // mostBlogs
}
