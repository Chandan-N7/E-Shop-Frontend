import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { add } from "../../redux/slices/cartSlice";
import { ADD_TO_CART_ROUTE } from "../../utils/constant";
import apiClient from "../../utils/api-client";

const ProductSide = ({ allProducts }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.user);
  const navigate = useNavigate();
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

  // console.log(allProducts)
  return (
    <div className="">
      <h2 className="text-xl font-medium text-slate-800">Search Results: {allProducts?.length}</h2>
      <div
        className=" grid lg:grid-cols-3 gap-4 lg:gap-3 md:grid-cols-3 sm:grid-cols-2 sm:px-0 1xsm:px-5">
            {allProducts.map((product) => (
              <div key={product._id} className=" rounded shadow my-5 ">
                <Link
                  to={`/product/${product._id}`}
                  className="flex items-center p-4 bg-slate-300 overflow-hidden "
                >
                  <div className="w-full h-32">
                    <img
                      src={product.productImages[0]}
                      alt={product.productName}
                      className="mix-blend-multiply object-contain w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-125"
                    />
                  </div>
                </Link>
                <div className="px-4 py-2 bg-white">
                  <div className=" w-full h-36">
                    <h2 className="text-[1rem] font-medium">
                      {product.productName.length > 25
                        ? `${product.productName.slice(0, 25)}...`
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
                    <button onClick={()=>{handleAddToCart(product._id)}} className="text-[0.8rem] w-full mt-4 p-1 px-4 text-white font-medium rounded-full border-2 border-red-600 bg-red-600 hover:bg-white hover:text-red-600">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductSide;

