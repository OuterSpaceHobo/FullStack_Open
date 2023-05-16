import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export const addNewBlog = async (newBlog, token) => {
    const response = await axios.post(baseUrl, newBlog, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export const addNewLike = async (Blog) => {
    const response = await axios.put(`${baseUrl}/${Blog.id}`, Blog, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.data
}

export const deleteBlog = async (Blog, token) => {
    const response = await axios.delete(`${baseUrl}/${Blog.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export default { getAll }