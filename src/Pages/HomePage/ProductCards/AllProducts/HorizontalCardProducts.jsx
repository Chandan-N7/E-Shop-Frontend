import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../../../utils/api-client";
import { ADD_TO_CART_ROUTE } from "../../../../utils/constant";
import { add } from "../../../../redux/slices/cartSlice";

const HorizontalCardProducts = ({ heading, category }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const scrollElement = useRef();
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const categoryLoadingList = new Array(10).fill(null);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 610;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 610;
  };

  const userInfo = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const handleAddToCart = async (productId) => {
    if (!userInfo || !userInfo.verified) {
      navigate("/auth");
    }
    if (userInfo && userInfo.verified) {
      try {
        const response = await apiClient.post(
          ADD_TO_CART_ROUTE,
          { productId },
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast.success("Product added to cart");
          dispatch(add({ productId: productId, quantity: 1 }));
        }
      } catch (error) {
        const err = error.response
          ? error.response.data.message
          : error.message;
        console.error("Error verifying OTP:", err);
        toast.error(err);
      }
    }
  };

  useEffect(() => {
    // Filter products to get only those with the 'Airpods' category
    const categoryProducts = products.filter(
      (product) => product.productCategory === category
    );
    setAllProducts(categoryProducts);
    if (categoryProducts.length > 0) {
      setLoading(false);
    }
  }, [products]);
  return (
    <div className="my-6">
      <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
      <div
        className="flex items-center gap-4 overflow-scroll hide-scrollbar transition-all duration-300 scroll-smooth "
        ref={scrollElement}
      >
        {allProducts.length >= 4 && (
          <>
            <button
              className="bg-white shadow-md rounded-full p-1 w-fi h-fit absolute left-0 text-lg lg:block xsm:hidden"
              onClick={scrollLeft}
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              className="bg-white shadow-md rounded-full p-1 w-fit h-fit absolute right-0 text-lg lg:block xsm:hidden"
              onClick={scrollRight}
            >
              <MdKeyboardArrowRight />
            </button>
          </>
        )}
        {loading ? (
          <>
            {categoryLoadingList.map((product, i) => (
              <div key={i} className=" rounded shadow flex  ">
                <div className="flex items-center p-4 bg-slate-300 overflow-hidden ">
                  <div className=" w-32 h-32 "></div>
                </div>
                <div className="p-4 bg-white">
                  <div className=" w-32">
                    <h2 className="h-6 w-full bg-slate-200 rounded animate-pulse"></h2>
                    <h3 className="mt-2 h-5 w-full bg-slate-200 animate-pulse"></h3>
                    <div className="mt-2 h-5 w-full rounded animate-pulse bg-slate-200"></div>
                    <button className=" mt-4 h-8 w-full rounded animate-pulse bg-slate-200"></button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {allProducts.map((product) => (
              <div key={product._id} className=" rounded shadow flex  ">
                <Link
                  to={`/product/${product._id}`}
                  className="flex items-center p-4 bg-slate-300 overflow-hidden "
                >
                  <div className=" w-32 h-32 ">
                    <img
                      src={product.productImages[0]}
                      alt={product.productName}
                      className="mix-blend-multiply object-contain w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-125"
                    />
                  </div>
                </Link>
                <div className="p-4 bg-white">
                  <div className=" w-32">
                    <h2 className="text-[1rem] font-medium">
                      {product.productName.length > 12
                        ? `${product.productName.slice(0, 12)}...`
                        : product.productName}
                    </h2>
                    <h3 className="mt-2 text-[0.9rem] text-slate-400">
                      {product.productCategory.charAt(0).toUpperCase() +
                        product.productCategory.slice(1)}
                    </h3>
                    <div className="mt-2 flex gap-[5px] text-[0.8rem]">
                      <p className="text-red-600 font-bold">
                        {product.productDisPrice.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                      <p className="line-through text-slate-400">
                        {product.productPrice.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                    <button
                      className="text-[0.8rem] w-full mt-4 p-1 px-4 text-white font-medium rounded-full border-2 border-red-600 bg-red-600 hover:bg-white hover:text-red-600"
                      onClick={() => handleAddToCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HorizontalCardProducts;
