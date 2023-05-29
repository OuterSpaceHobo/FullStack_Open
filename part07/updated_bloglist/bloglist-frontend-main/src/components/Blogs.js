import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Table } from 'react-bootstrap'
import Togglable from './Toggable.js';
import BlogForm from './BlogForm.js';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const blogsCopy = [...blogs];
  const reduxUser = useSelector(state => state.user)
  // console.log('blogsCopy', blogsCopy)

  return (
  <>
  <h2>blogs</h2>
  <Togglable buttonLabel="create new blog">
    <BlogForm />
  </Togglable>
  <Table striped>
    <tbody>
      {blogsCopy
      .sort(function (a, b) {
      return b.likes - a.likes;
      })
      .map((blog) => (
        <tr key={blog.id}>
          <td>
            <Link 
              to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </td>
          <td>
            {blog.author}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
  </>
  );
};

export default Blogs;
