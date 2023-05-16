const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    // const blogs = await Blog.find({})
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    let req = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    // const user = await User.findById(req.userId)
    // const blog =  new Blog(req)
    
    const blog =  new Blog({
        title: req.title,
        author: req.author,
        url: req.url,
        likes: req.likes,
        user: user.id
    })

    const postedBlog = await blog.save()

    user.blogs = user.blogs.concat(postedBlog._id)
    await user.save()

    response.status(201).json(postedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
        
    const delBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    console.log(delBlog, 'deleted')
})

blogsRouter.put('/:id', (request, response) => {
    const body = request.body
    const blog = {
        likes: body.likes
    }

    Blog.findByIdAndUpdate(
        request.params.id, 
        blog, 
        { new: true, runValidators: true, context: 'query' })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
})

module.exports = blogsRouter