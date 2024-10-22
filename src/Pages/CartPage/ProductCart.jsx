import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiMinus, FiPlus } from "react-icons/fi";
import { formatToINRCurrency } from "../../utils/currency";
import apiClient from "../../utils/api-client";
import { toast } from "react-toastify";
import {
  DECREASE_PRODUC_QUANTITY_ROUTE,
  INCREASE_PRODUC_QUANTITY_ROUTE,
  REMOVE_FROM_CART_ROUTE,
} from "../../utils/constant";
import {
  decreaseQuantity,
  increaseQuantity,
  remove,
} from "../../redux/slices/cartSlice";
import TotalAmount from "./TotalAmount";
import { Link } from "react-router-dom";

const ProductCart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const cartProduct = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.products.products);
  // Filter and merge cart product details with their quantities
  const cartProductsDetails = products
    .filter((product) =>
      cartProduct.items.some((cartItem) => cartItem.productId === product._id)
    )
    .map((product) => {
      const cartItem = cartProduct.items.find(
        (cartItem) => cartItem.productId === product._id
      );
      return {
        ...product,
        quantity: cartItem.quantity,
        totalPrice: product.productDisPrice * cartItem.quantity,
      }; // Calculate total price for each product
    });

  // Calculate the total price of all items in the cart
  const totalPrice = cartProductsDetails.reduce(
    (sum, product) => sum + product.totalPrice,
    0
  );
  const totalQuantity = cartProductsDetails.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const handleDecrease = async (productId, quantity) => {
    try {
      const response = await apiClient.post(
        DECREASE_PRODUC_QUANTITY_ROUTE,
        { productId },
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(decreaseQuantity(productId));
      }
    } catch (error) {
      const err = error.response ? error.response.data.message : error.message;
      console.error("Error verifying OTP:", err);
      toast.error(err);
    }
  };
  const handleIncrese = async (productId) => {
    try {
      const response = await apiClient.post(
        INCREASE_PRODUC_QUANTITY_ROUTE,
        { productId },
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(increaseQuantity(productId));
      }
    } catch (error) {
      const err = error.response ? error.response.data.message : error.message;
      console.error("Error verifying OTP:", err);
      toast.error(err);
    }
  };

  const handleDelete = async (productId) =>{
    try {
      const response = await apiClient.post(REMOVE_FROM_CART_ROUTE,{productId}, {withCredentials:true})
      if(response.status === 200){
        dispatch(remove(productId))
        toast.success(response.data.message)
      }
    } catch (error) {
      const err = error.response ? error.response.data.message : error.message;
      console.error("Error verifying OTP:", err);
      toast.error(err);
    }
  }
  useEffect(() => {
    setLoading(true);
    if (cartProductsDetails.length > 0) {
      setEmpty(false);
      setLoading(false);
    }else {
      setEmpty(true);
      setLoading(false);
    }
  },[cartProductsDetails]);
  return (
    <>
      {loading ? (
        <div className="my-[30px]  p-5 flex gap-5 md:flex-row xsm:flex-col-reverse">
          <div className="w-full bg-white p-4">
            <h2 className=" w-full h-[36px] bg-slate-200 rounded animate-pulse"></h2>
            <div className="flex flex-col gap-5">
              <div>
                <div className=" flex gap-3 mt-1">
                  <div className="w-full sm:w-[200px] h-[200px]  bg-slate-200 animate-pulse "></div>
                  <div className="my-[30px]  p-5 flex gap-5 md:flex-row xsm:flex-col-reverse">
                    <div className="flex flex-col items-start">
                      <h2 className="w-[200px] h-[24px] bg-slate-200 animate-pulse"></h2>
                      <p className="my-1 w-[200px] h-[24px] bg-slate-200 animate-pulse"></p>
                      <p className="my-1 w-[200px] h-[24px] bg-slate-200 animate-pulse"></p>
                      <p className="my-2 w-[200px] h-[24px] bg-slate-200 animate-pulse"></p>
                      <div className="my-1 w-[200px] h-[24px] bg-slate-200 animate-pulse"></div>
                    </div>
                    <div className="w-[60px] h-[24px] bg-slate-200 animate-pulse"></div>
                  </div>
                </div>
                <hr className="border-1 border-[#d2d2d2]" />
              </div>
            </div>
          </div>
          <div className="w-[300px] bg-white p-4 h-fit sticky top-[120px] ">
            <div className="flex flex-col h-full">
              <h3 className="w-[200px] h-[36px] bg-slate-200 animate-pulse"></h3>
              <div className="my-[20px] flex flex-col justify-between w-full gap-5">
                <p className="w-full h-[24px] bg-slate-200 animate-pulse"></p>
                <button className="h-[36px] bg-slate-200 animate-pulse w-full rounded-full"></button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {empty ? (
            <div className="my-[30px]  p-5 bg-white shadow-lg">
              Your shopping cart is waiting. Give it purpose - fill it with
              electronics items and more. Continue shopping on the{" "}
              <Link to={"/"} className="italic text-red-600 underline cursor-pointer">
                E-SHOP homepage
              </Link>
              , learn about today's deals, or visit your Wish List.
            </div>
          ) : (
            <div className=" my-[30px]  p-5 flex gap-5 md:flex-row xsm:flex-col-reverse">
              <div className="w-full bg-white p-4">
                <h2 className="text-3xl font-medium">Shopping Cart</h2>
                <div className="flex flex-col gap-5">
                  {cartProductsDetails.map((product, i) => (
                    <div key={i}>
                      <div className=" flex gap-3 sm:flex-row flex-col">
                        <Link to={`/product/${product._id}`} className="w-full sm:w-[200px] h-[200px] ">
                          <img
                            src={product.productImages[0]}
                            alt=""
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 ease-in-out transform hover:scale-125"
                          />
                        </Link>
                        <div className="my-[30px] flex justify-between w-full 1xsm:flex-row flex-col-reverse">
                          <div className="flex flex-col items-start">
                            <h2 className="text-2xl">{product.productName}</h2>
                            <p className="mb-1 text-lg text-slate-600 capitalize">
                              {product.productCategory}
                            </p>
                            <p className=" text-xl font-medium text-red-600">
                              {formatToINRCurrency(product.productDisPrice)}
                            </p>
                            <p className="mb-2 text-slate-600 text-[0.9rem] italic hover:text-red-600 cursor-pointer" onClick={()=>handleDelete(product._id)}>Delete</p>
                            <div className="flex gap-1 items-center justify-center">
                              <p>Qty:</p>
                              <button
                                className="p-[3px] rounded border-2 border-[#000] hover:bg-slate-200 disabled:border-slate-400 disabled:text-slate-400 disabled:cursor-not-allowed"
                                disabled={product.quantity <= 1}
                                onClick={() =>
                                  handleDecrease(product._id, product.quantity)
                                }
                              >
                                <FiMinus />
                              </button>
                              <p className="mx-2">{product.quantity}</p>
                              <button
                                className="p-[3px] rounded border-2 border-[#000] hover:bg-slate-200 disabled:border-slate-400 disabled:text-slate-400 disabled:cursor-not-allowed"
                                disabled={product.quantity >= 10}
                                onClick={() => handleIncrese(product._id)}
                              >
                                <FiPlus />
                              </button>                              
                            </div>
                          </div>
                          <div>
                            <p className="bg-red-600 text-white text-center w-[60px] text-[0.8rem] py-1 px-2 rounded mb-5">
                              {(
                                ((product.productPrice -
                                  product.productDisPrice) /
                                  product.productPrice) *
                                100
                              ).toFixed(0)}
                              % off
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="border-1 border-[#d2d2d2]" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-[300px] bg-white p-4 h-fit md:sticky top-[120px] ">
                <TotalAmount totalPrice={totalPrice} totalQuantity = {totalQuantity} data={cartProduct.items}/>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductCart;
