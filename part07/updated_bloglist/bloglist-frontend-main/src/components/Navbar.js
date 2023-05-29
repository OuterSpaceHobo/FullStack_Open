import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav } from 'react-bootstrap'

import { loginUserState } from '../reducers/userReducer.js';
import { useNavigate } from "react-router-dom";

export const TopNavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const reduxUser = useSelector(state => state.user)
    const padding = {
      paddingRight: 5
    }

    const handleLogout = async () => {
      dispatch(loginUserState(null));  
      navigate('/')
    };

    return (
<div>
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/">blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/users">users</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          {reduxUser.username} logged in 
          <button id="logout-button" onClick={handleLogout}>
            logout
          </button>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
</div>
    )
  }