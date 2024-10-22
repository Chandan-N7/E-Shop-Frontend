export const HOST = import.meta.env.VITE_SERVER_URL;


export const ROUTES = "/api"

//auth
export const CREATE_ROUTES = `${ROUTES}/create-user`
export const VERIFYOTP_ROUTES = `${ROUTES}/verifyOTP`
export const RESENDOTP_ROUTES = `${ROUTES}/resendOTP`
export const LOGIN_ROUTES = `${ROUTES}/login`
export const USERINFO_ROUTES = `${ROUTES}/user-info`
export const LOGOUT_ROUTES = `${ROUTES}/logout`

// Product 
export const UPLOAD_PRODUCT_ROUTE = `${ROUTES}/upload-product`
export const GET_PRODUCTS_ROUTE = `${ROUTES}/get-products`
export const DELETE_PRODUCT_ROUTE = `${ROUTES}/delete-product`; // Add this for delete


// Addm to cart
export const ADD_TO_CART_ROUTE = `${ROUTES}/add-to-cart`
export const GET_CART_PRODUCTS_ROUTE = `${ROUTES}/get-cart-products`
export const INCREASE_PRODUC_QUANTITY_ROUTE = `${ROUTES}/increse-products-quantity`
export const DECREASE_PRODUC_QUANTITY_ROUTE = `${ROUTES}/decrease-products-quantity`
export const REMOVE_FROM_CART_ROUTE = `${ROUTES}/remove-from-cart`
export const REMOVE_CART_ROUTE = `${ROUTES}/remove-cart`

// Filter Product
export const FILTER_PRODUCT = `${ROUTES}/filter-product`

// Search Product
export const SEARCH_PRODUCT = `${ROUTES}/search-product`

// Payment
export const CHECKOUT_ROUTE = `${ROUTES}/checkout`
export const SUCCESS_ROUTE = `${ROUTES}/payment-success`
export const GET_ORDER_LIST_ROUTE = `${ROUTES}/get-order-list`



