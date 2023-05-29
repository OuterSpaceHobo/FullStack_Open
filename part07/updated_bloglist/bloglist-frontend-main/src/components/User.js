import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";

const User = () => {  
    const { id }  = useParams();
    console.log('id', id)
    const user = useSelector((state) => state.users.find((user) => user.id === id))
    console.log('user', user)
    
    if (!user) {
        return null
      }
    // const blogs = useSelector(state => state.blogs)
    // const blogsCopy = [...blogs];

    return (
        <div>
            <h2>{user.username}</h2>
            <p>added blogs:</p>
            {user.blogs.length === 0 && (
                <p>not a single blog</p>
            )}
            {user.blogs
                .map((blog) => (
                    <ul key={blog.id}>
                        <li key={blog.id}>
                            {blog.title}
                        </li>
                    </ul>
                ))
            }
        </div>
      );
    };
    
    export default User;