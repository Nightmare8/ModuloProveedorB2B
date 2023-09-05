import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    cart: null,
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
        addProduct: (state, action) => {
            state.cart.push(action.payload.product);
        },
        removeProduct: (state, action) => {
            state.cart = state.cart.filter((item) =>
                item.name != action.payload.name
            )
        },
        updateCart: (state, action) => {
            state.cart.forEach((item) => {
                if (item.name === action.payload.product.name){
                    item.quantity = action.payload.product.quantity
                }
            });
        },
        sumProduct: (state, action) => {
            state.cart.forEach((item) => {
                if (item.name === action.payload.product.name){
                    item.quantity += 1
                }
            })
        },
        restProduct: (state, action) => {
            state.cart.forEach((item) => {
                if (item.name === action.payload.product.name){
                    item.quantity -= 1
                }
            })
        },
    }
});

export const { setLogin, updateLogin, setLogout, addProduct, removeProduct, updateCart, sumProduct, restProduct} = authSlice.actions;

export default authSlice.reducer;