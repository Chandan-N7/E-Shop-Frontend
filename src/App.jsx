import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import AuthOTP from "./Pages/AuthPages/AuthOTP";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./redux/slices/userSlice";
import apiClient from "./utils/api-client";
import {
  GET_CART_PRODUCTS_ROUTE,
  GET_PRODUCTS_ROUTE,
  USERINFO_ROUTES,
} from "./utils/constant";
import Profile from "./components/Profile/Profile";
import { setProducts } from "./redux/slices/ProductsSlice";
import { setCart } from "./redux/slices/cartSlice";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { add } from "./redux/slices/cartSlice";
import Cart from "./components/Cart/Cart";
import { HashLoader } from "react-spinners";
import CategoryProduct from "./components/CategoryProduct/CategoryProject";
import SearchProduct from "./components/SearchProduct/SearchProduct";
import PaymentSuccess from "./components/Payment/PaymentSuccess";
import PageError from "./components/PageError/PageError";
import Footer from "./components/Footer/Footer";
function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get(USERINFO_ROUTES, {
          withCredentials: true,
        });
        if (response.status === 201) {
          dispatch(setUser(response.data.userData));
          setLoading(false);
        }
      } catch (error) {
          setLoading(false);
          console.log(error);
      }
    };
    const getProducts = async () => {
      try {
        const response = await apiClient.get(GET_PRODUCTS_ROUTE);
        if (response.status === 200) {
          dispatch(setProducts(response.data));
          setLoading(false);
        }
      } catch (error) {
          setLoading(false);
          console.log(error);
      }
    };
    getUserInfo();
    getProducts();
  }, []);

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        const response = await apiClient.get(GET_CART_PRODUCTS_ROUTE, {
          withCredentials: true,
        });
        if (response?.status === 200) {
          if (userInfo?.id === response?.data[0]?.userId) {
            dispatch(setCart(response.data[0].item));
            setLoading(false)
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    getCartProducts();
  }, [userInfo]);
  // console.log(cart)

  return (
    <>
      {loading ? (
        <div className="w-full h-[100vh] flex items-center justify-center"><HashLoader /></div>
      ) : (
        <Router>
          <Navbar />
          <div className="max-w-[1280px] m-auto p-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/search" element={<SearchProduct/>} />
              <Route path="/product-category/" element={<CategoryProduct />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/verify-email" element={<AuthOTP />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="*" element={<PageError />} />
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </div>
          <Footer/>
        </Router>
      )}
    </>
  );
}

export default App;
