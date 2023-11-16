import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            //Have to verify if the product is already in the cart}
            const product = state.cart.find((item) => {
                console.log("item", item)
                return item.product.idProducto === action.payload.product.idProducto
            } 
            );
            console.log("product", product)
            
            if (product) {
                console.log("el producto ya estaba incluido")
                state.cart.forEach((item) => {
                    if (item.product.idProducto === action.payload.product.idProducto) {
                        item.quantity += 1
                    }
                })
            } else {
                console.log("el producto no estaba incluido")
                state.cart.push(action.payload);
            }
        },
        removeProduct: (state, action) => {
            //Have to remove the selected product from the cart
            state.cart = state.cart.filter((item) => item.product.idProducto !== action.payload.product.idProducto);
        },
        updateCart: (state, action) => {
            state.cart.forEach((item) => {
                if (item.product.idProducto === action.payload.product.idProducto) {
                    item.quantity = action.payload.product.quantity
                }
            });
        },
        sumProduct: (state, action) => {
            state.cart.forEach((item) => {
                if (item.product.idProducto === action.payload.product.idProducto) {
                    item.quantity += 1
                }
            })
        },
        restProduct: (state, action) => {
            state.cart.forEach((item) => {
                if (item.product.idProducto === action.payload.product.idProducto) {
                    item.quantity -= 1
                }
            })
        },
        clearCart: (state) => {
            console.log("se ejecuta la funcion de limpiar")
            state.cart = [];
        }
    }
});

export const { addProduct, removeProduct, updateCart, sumProduct, restProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;