import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Table } from 'react-bootstrap'


const Users = () => {
  const users = useSelector((state) => state.users);
  const usersCopy = [...users];

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <td>Users:</td>
            <td>Blogs created:</td>
          </tr>
        </thead>
        {usersCopy
        .map((user) => (
          <tbody key={user.id}>
            <tr>
              <td>
              <Link to={`/users/${user.id}`}>
              {user.username}
              </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          </tbody>
      ))
      }
      </Table>
    </>
  ); 
};

export default Users;
