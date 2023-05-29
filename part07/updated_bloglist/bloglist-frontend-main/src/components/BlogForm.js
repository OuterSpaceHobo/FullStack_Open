import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { createNotification } from "../reducers/notifReducer.js";
import { addBlog } from "../reducers/blogReducer.js";
 
const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch()
  const reduxUser = useSelector(state => state.user)

  const handleAddBlog = (blogObject) => {
    // console.log('blogObject', blogObject);
    // console.log('reduxUser.token', reduxUser.token);
    dispatch(addBlog(blogObject, reduxUser.token))
    dispatch(createNotification(`New blog ${blogObject.title} added by ${reduxUser.username}`, 3));
  };

  const handleAddNewBlog = (event) => {
    event.preventDefault();
    handleAddBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    });
  };

  return (
  <>
  <h2>create new blog</h2>
    <Form onSubmit={handleAddNewBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type="text"
          id="title"
          value={title}
          placeholder="write blog text here"
          onChange={({ target }) => setTitle(target.value)}
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          type="text"
          id="author"
          value={author}
          placeholder="write author here"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          type="text"
          id="url"
          value={url}
          placeholder="write url here"
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button 
          id="publish-button" type="submit"
          variant="primary" >
          publish
        </Button>
      </Form.Group>
    </Form>
  </>
  );
};

export default BlogForm;
