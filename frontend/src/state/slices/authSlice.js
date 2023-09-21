import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        updateLogin: (state, action) => {
            state.user.company = action.payload.company;
            state.user.companyName = action.payload.companyName;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
    }
});

export const { setLogin, updateLogin, setLogout} = authSlice.actions;

export default authSlice.reducer;