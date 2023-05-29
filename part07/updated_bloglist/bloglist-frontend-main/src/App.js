/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import Blogs from "./components/Blogs.js";
import Blog from "./components/Blog.js";
import Notification from "./components/Notification.js";
import loginService from "./services/login.js";
import LoginForm from "./components/LoginForm.js";
import Users from "./components/Users.js";
import User from "./components/User.js";
import { TopNavBar } from "./components/Navbar.js";

import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from "./reducers/notifReducer.js";
import { loginUserState, initializeUser } from "./reducers/userReducer.js";
import { initializeBlogs } from "./reducers/blogReducer.js"; //
import { initializeUsers } from "./reducers/usersReducer.js";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const reduxUser = useSelector(state => state.user)
  const reduxBlogs = useSelector(state => state.blogs)
  console.log('reduxBlogs', reduxBlogs) 

  useEffect(() => {
    dispatch(initializeUser()) 
    dispatch(initializeBlogs()) 
    dispatch(initializeUsers()) 

  }, [dispatch]) 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(loginUserState(user));  
    } catch (exception) {
      dispatch(createNotification(`Wrong login or password`, 3));
    }
  };

  return (
    <>
      <div className="container">
        <Notification />      
        {reduxUser === null && (
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        )}
        {reduxUser !== null && (
          <>
          <TopNavBar /> 
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
          </>
        )}
      </div>
    </>
  );
};

export default App;
