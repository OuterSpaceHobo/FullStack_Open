import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "/api/login";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
    setReduxUser(state, action) {
        return action.payload;
    },
    },
});

export const { setReduxUser } = userSlice.actions;

export const loginUserState = (credentials) => {
    window.localStorage.setItem("ReduxlLoggedBlogAppUser", JSON.stringify(credentials));
    console.log('credentials', credentials)

    return async (dispatch) => {
        dispatch(setReduxUser(credentials));
    };
};

export const initializeUser = () => {
    return async dispatch => {
        const JSONUser = window.localStorage.getItem("ReduxlLoggedBlogAppUser");
        const parsedUser = JSON.parse(JSONUser)
        // console.log('JSONUser', JSONUser)
        // console.log('parsedUser', parsedUser)
        dispatch(setReduxUser(parsedUser))
    }
}

export default userSlice.reducer;