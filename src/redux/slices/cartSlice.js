import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: {
        items:[],
    },
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        add:(state, action)=>{
            const product = action.payload;
            const existingProduct = state.cart.items.findIndex(item =>item.productId === product.productId);
            if(existingProduct > -1){
                state.cart.items[existingProduct].quantity += product.quantity;
            }else{
                state.cart.items.push(product);
            }
        },
        setCart: (state, action) => {
            // Sets the cart with data fetched from the database
            state.cart.items = action.payload;
        },
        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const existingProductIndex = state.cart.items.findIndex(item => item.productId === productId);
            if (existingProductIndex > -1) {
                state.cart.items[existingProductIndex].quantity += 1; // Increment the quantity
            }
        },
        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const existingProductIndex = state.cart.items.findIndex(item => item.productId === productId);
            if (existingProductIndex > -1) {
                state.cart.items[existingProductIndex].quantity -= 1; // Increment the quantity
            }
        },
        remove: (state, action) => {
            const productId = action.payload;
            const productIndex = state.cart.items.findIndex(item => item.productId === productId);        
            if (productIndex > -1) {
                state.cart.items.splice(productIndex, 1);
            }
        },
        removeAllItems: (state) => {
            state.cart.items = [];
        }
    },
})

export const { add, setCart,increaseQuantity, decreaseQuantity, remove, removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;