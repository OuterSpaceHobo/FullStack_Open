import { createSlice } from '@reduxjs/toolkit'
import { addNewBlog, deleteBlog, addNewLike, addComment } from '../services/blogs.js'
import blogService from "../services/blogs.js";

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    cleanBlog(state, action) {
      const id = action.payload.id;
      return state.filter(((blog) => blog.id !== id))
    },
    addLike(state, action) {
      const id = action.payload.id
      const blogToLike = state.find(likedBlog => likedBlog.id === action.payload.id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      console.log('likedBlog', likedBlog)
      return state.map(blog => blog.id !== action.payload.id ? blog : likedBlog)     
    },
    setBlogs(state, action) {
      return action.payload
    },
    addComm(state, action) {
      const updatedBlog = action.payload;
      const id = updatedBlog.id;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    }
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }
}

export const delBlog = (content, token) => {
  return async dispatch => {
    const deletedBlog = await deleteBlog(content, token)
    console.log('deletedBlog', deletedBlog)
    dispatch(cleanBlog(content))
  }
}

export const addBlog = (content, token) => {
  return async dispatch => {
    const newBlog = await addNewBlog(content, token)
    dispatch(createBlog(newBlog))
  }
}

export const updateBlog = content => {
  return async dispatch => {
    const updatedBlog = {
      ...content, 
      likes: content.likes + 1 }
    const votedBlog = await addNewLike(updatedBlog);
    dispatch(addLike(votedBlog));
  }
}

export const doAddComm = (content, id) => {
  return async dispatch => {
    const jsonComment = {
      comment: content
    }
    const newBlog = await addComment(jsonComment, id)
    dispatch(addComm(newBlog))
  }
}

export const { setBlogs, createBlog, cleanBlog, addLike, addComm } = blogSlice.actions

export default blogSlice.reducer