import { configureStore } from "@reduxjs/toolkit";
import notifReducer from "./reducers/notifReducer.js";
import userReducer from "./reducers/userReducer.js";
import blogReducer from "./reducers/blogReducer.js";
import usersReducer from "./reducers/usersReducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notifReducer,
    blogs: blogReducer,
    users: usersReducer,
  },
});

export default store;