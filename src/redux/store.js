import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productsReducer from './slices/ProductsSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartSlice,
  },
});
