import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { createNotification } from "../reducers/notifReducer.js";
import { delBlog, updateBlog, doAddComm } from "../reducers/blogReducer.js";

  const Blog = ({ mock }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const reduxUser = useSelector(state => state.user)

  const { id } = useParams();
  console.log('id', id)
  
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleIncrementLike = (blog) => {
    if (mock !== undefined) {
      console.log("mock", mock);
      mock();
    } else {
    dispatch(updateBlog(blog))
    dispatch(createNotification(`Blog ${blog.title} liked by ${reduxUser.username}`, 3));
    }
  };

  const toggleDeleteBlog = () => {
    window.confirm(`Remove blog ${blog.title}?`);
    handleDeleteBlog(blog);
    navigate('/')
  };

  const handleDeleteBlog = (blogObject) => {
    dispatch(delBlog(blogObject, reduxUser.token))
    dispatch(createNotification(`Blog ${blogObject.title} deleted by ${reduxUser.username}`, 3));
  };

  function handleComment(event) {
    event.preventDefault();
    console.log('blog:', blog)
    console.log('comment:', comment)

    dispatch(doAddComm(comment, blog.id)) //
    dispatch(createNotification(`Added comment to ${blog.title}`, 3));
  }

  function handleTextareaChange(event) {
    event.preventDefault();
    setComment(event.target.value);
  }

  if (!blog) {
    return null
  }

  return (
  <div className="blog" style={blogStyle}>
      <div>
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>{reduxUser.username}</div>
        <div id="likes">{blog.likes}
        <button id="like-button" onClick={() => toggleIncrementLike(blog)}>
          like
        </button>
      </div>
      {reduxUser.username === blog.user.username && (
        <div>
          <button id="delete-button" onClick={() => toggleDeleteBlog(blog)}>
            remove
          </button>
        </div>
    )}
    </div>

    <h4>Comments:</h4>
    <form onSubmit={handleComment}>
      <input 
      type='text'
      value={comment}
      onChange={handleTextareaChange}
      />
      <button>add comment</button>
    </form>
    {blog.comments
                .map((comment) => (
                    <ul>
                        <li key={blog.id}>
                            {comment}
                        </li>
                    </ul>
                ))
            }

  </div>
  );
};

export default Blog;
