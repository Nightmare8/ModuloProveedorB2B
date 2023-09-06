import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    cart: [ ],
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
            //Have to verify if the product is already in the cart}
            console.log("action", action.payload.product)
            if (state.cart.filter((item) => item.name === action.payload.product.name).length > 0){
                state.cart.forEach((item) => {
                    if (item.name === action.payload.product.name){
                        item.quantity += 1
                    }
                })
            } else {
                state.cart.push(action.payload);
            }
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
        clearCart: (state) => {
            state.cart = [ ];
        }
    }
});

export const { setLogin, updateLogin, setLogout, addProduct, removeProduct, updateCart, sumProduct, restProduct, clearCart} = authSlice.actions;

export default authSlice.reducer;