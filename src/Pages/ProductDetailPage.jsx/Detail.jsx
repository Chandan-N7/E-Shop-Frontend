import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { formatToINRCurrency } from "../../utils/currency";
import RecommendPrdouct from "./RecommendPrdouct";
import apiClient from "../../utils/api-client";
import { ADD_TO_CART_ROUTE } from "../../utils/constant";
import { toast } from "react-toastify";
import { add } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Detail = ({ id }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const imageLoadingList = new Array(4).fill(null);
  const [activeImaage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState({ x: 0, y: 0, visible: false });

  const handleZoomImage = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Set the x and y for zoom effect and make the zoom div visible
    setZoomImage({
      x,
      y,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    // Hide zoom when mouse leaves the image
    setZoomImage((prev) => ({ ...prev, visible: false }));
  };

  const userInfo = useSelector((state) => state.user.user);
  const handleAddToCart = async (productId) => {
    if(!userInfo || !userInfo.verified){
      navigate('/auth')
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
  const navigate = useNavigate()
  const handleBuy = async (productId) => {
    if(!userInfo || !userInfo.verified){
      navigate('/auth')
    }
    if (userInfo && userInfo.verified) {
      try {
        const response = await apiClient.post(
          ADD_TO_CART_ROUTE,
          { productId },
          { withCredentials: true }
        );
        if (response.status === 200) {
          dispatch(add({ productId: productId, quantity: 1 }));
          navigate('/cart')
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
    const Id = products.find((product) => product._id === id);
    setProduct(Id);
    setActiveImage(Id && Id.productImages[0]);
    if (Id) {
      setLoading(false);
    }
    window.scrollTo(0, 0);
  }, [products, id]);
  return (
    <div className="">
      {loading ? (
        <div className="flex gap-5 flex-col items-center md:flex-row md:items-start">
          <div className="flex  gap-5 flex-col-reverse lg:flex-row  ">
            <div className="flex lg:flex-col gap-2 h-full overflow-scroll hide-scrollbar">
              {imageLoadingList.map((el, i) => {
                return (
                  <div
                    key={i}
                    className="h-16 w-16 1xsm:w-20 1xsm:h-20 bg-slate-200 rounded cursor-pointer"
                  ></div>
                );
              })}
            </div>
            <div className="bg-slate-200 rounded w-72 h-72 1xsm:h-96 1xsm:w-96"></div>
          </div>
          {/* product Detaile  */}
          <div className="flex flex-col gap-1 w-full">
            <p className="bg-slate-200 px-2 rounded-full w-full h-5 animate-pulse"></p>
            <h2 className="bg-slate-200 px-2 rounded-full w-full h-10 animate-pulse"></h2>
            <p className="bg-slate-200 px-2 rounded-full w-full h-6 animate-pulse"></p>
            <div className="bg-slate-200 px-2 rounded-full w-full h-4 animate-pulse"></div>
            <div className="flex items-center gap-2 ">
              <p className="bg-slate-200 px-2 rounded-full w-[150px] h-9 animate-pulse"></p>
              <p className="bg-slate-200 px-2 rounded-full w-[150px] h-9 animate-pulse"></p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="bg-slate-200 px-2 rounded-full w-[150px] h-10 animate-pulse"></button>
              <button className="bg-slate-200 px-2 rounded-full w-[150px] h-10 animate-pulse"></button>
            </div>
            <div>
              <p className="bg-slate-200 px-2 rounded-full w-[150px] h-6 animate-pulse"></p>
              <p className="bg-slate-200 px-2 rounded-full w-[150px] h-6 animate-pulse my-2"></p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 flex-col items-center md:flex-row md:items-start relative">
          <div className="flex  gap-5 flex-col-reverse lg:flex-row md:sticky top-[94px] ">
            <div className="flex  gap-2 h-full overflow-scroll hide-scrollbar lg:flex-col ">
              {product &&
                product?.productImages?.map((img, i) => {
                  return (
                    <div
                      key={i}
                      className="h-16 w-16 1xsm:w-20 1xsm:h-20 bg-slate-200 rounded cursor-pointer"
                      onClick={() => setActiveImage(img)}
                      onMouseEnter={() => setActiveImage(img)}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                  );
                })}
            </div>
            <div className="bg-slate-200 rounded w-72 h-72 1xsm:h-96 1xsm:w-96 relative">
              <img
                src={activeImaage}
                alt="Zoomable"
                className="w-full h-full object-contain mix-blend-multiply cursor-pointer"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleMouseLeave}
              />

              {/* Zoomed Image Div */}
              <div
                className={`${
                  zoomImage.visible ? "lg:block hidden" : "hidden"
                } absolute min-w-[400px] min-h-[400px] bg-slate-200 -right-[410px] top-0 z-20 `}
              >
                <div
                  className="w-full h-full min-w-[400px] min-h-[400px] mix-blend-multiply"
                  style={{
                    backgroundImage: `url(${activeImaage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImage.x}% ${zoomImage.y}%`,
                    backgroundSize: "200%", // Adjust for the level of zoom
                  }}
                ></div>
              </div>
            </div>
          </div>
          {/* product Detaile  */}
          <div className="flex flex-col gap-1 w-full">
            <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
              {product?.productBrand}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {product?.productName}
            </h2>
            <p className="capitalize text-slate-400">
              {product?.productCategory}
            </p>
            <div className="flex text-red-600 items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl font-medium mt-2 lg:text-3xl">
              <p className="text-red-600">
                {formatToINRCurrency(product?.productDisPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {formatToINRCurrency(product?.productPrice)}
              </p>
            </div>
            <div className="font-medium text-[22px]">
              <p className="text-red-600">
                {product?.productDisPrice
                  ? `${(
                      ((product.productPrice - product.productDisPrice) /
                        product.productPrice) *
                      100
                    ).toFixed(2)}% off`
                  : null}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button onClick={()=>handleBuy(product._id)} className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all duration-300">
                Buy
              </button>
              <button onClick={()=>handleAddToCart(product._id)} className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] bg-red-600 text-white font-medium hover:bg-white hover:text-red-600 transition-all duration-300">
                Add to Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p>{product?.productDescription}</p>
            </div>
          </div>
        </div>
      )}
      <div className="my-8">
        <RecommendPrdouct
          category={product?.productCategory}
          heading={"Recommended Prdouct"}
        />
      </div>
    </div>
  );
};

export default Detail;
