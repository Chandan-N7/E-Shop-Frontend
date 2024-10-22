import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../../utils/api-client";
import { GET_ORDER_LIST_ROUTE, REMOVE_CART_ROUTE } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeAllItems } from "../../redux/slices/cartSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const searchQuery = useSearchParams()[0];
  const reference = searchQuery.get("reference");
  const status = searchQuery.get("status");
  console.log(status);

  useEffect(() => {
    const orderList = async () => {
      try {
        const response = await apiClient.get(GET_ORDER_LIST_ROUTE, {
          withCredentials: true,
        });
        const orderExists = response.data.find(
          (order) => order.razorpay_payment_id === reference
        );
        if (!orderExists || !reference) {
          navigate("*");
          return console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    const removeCart = async () => {
      try {
        const response = await apiClient.get(REMOVE_CART_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200) {
          dispatch(removeAllItems());
        }
      } catch (error) {
        console.log(error);
      }
    };
    orderList();
    removeCart();
  }, [reference, navigate]);

  return (
    <div className="absolute w-[100vw] h-[100vh]  top-0 left-0 z-[1000] bg-[#f1f5f9] flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-[2rem] font-semibold">Order Successfull</h3>
        <p className="text-[0.9rem]">Reference No: {reference}</p>
        <p className="text-[1rem] my-2">
          <Link to={"/profile"} className="bg-blue-600 text-white px-4 py-2 rounded">
            Your Order
          </Link>
          <Link
            to="/"
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Home page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
