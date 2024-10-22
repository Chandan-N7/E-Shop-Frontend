import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { add } from "../../redux/slices/cartSlice";
import { ADD_TO_CART_ROUTE, SEARCH_PRODUCT } from "../../utils/constant";
import apiClient from "../../utils/api-client";
import { useEffect, useState } from "react";

const SearchProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParms] = useSearchParams();
  const userInfo = useSelector((state) => state.user.user);
  const handleAddToCart = async (productId) => {
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

  const query = searchParms.get("q");
  const [products, setProducts] = useState([]);
  const [noProducts, setNoProducts] = useState('');
  useEffect(() => {
    const searchProduct = async () => {
      try {
        const response = await apiClient.post(SEARCH_PRODUCT, { query });
        if (response.status === 200) {
          setProducts(response.data);
        }
        console.log(response.status);
      } catch (error) {
        const err = error.response
          ? error.response.data.message
          : error.message;
        console.error(err);
        if (error.status === 404) {
          setProducts([])
          setNoProducts(err);
        }
      }
    };
    searchProduct();
  }, [query]);
  useEffect(()=>{
    if(searchParms.size <=0 || !query){
      navigate('*')
    }
  },[])

  return (
    <div className="min-h-[85vh]">
      {products.length > 0 && (
        <div className="my-6 ">
          <h2 className="text-2xl font-medium mb-4">
            Search Results : {products.length}
          </h2>
          <div className=" grid lg:grid-cols-4 gap-4 lg:gap-2 md:grid-cols-3 sm:grid-cols-2 sm:px-0 1xsm:px-5">
            {products?.map((product) => (
              <div key={product._id} className=" rounded shadow my-5 ">
                <Link
                  to={`/product/${product._id}`}
                  className="flex items-center p-4 bg-slate-300 overflow-hidden "
                >
                  <div className=" h-32 w-full">
                    <img
                      src={product.productImages[0]}
                      alt={product.productName}
                      className="mix-blend-multiply object-contain w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-125"
                    />
                  </div>
                </Link>
                <div className="px-4 py-2 bg-white">
                  <div className=" h-36 w-full">
                    <h2 className="text-[1rem] font-medium">
                      {product.productName.length > 20
                        ? `${product.productName.slice(0, 20)}...`
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
                      onClick={() => {
                        handleAddToCart(product._id);
                      }}
                      className="text-[0.8rem] w-full mt-4 p-1 text-white font-medium rounded-full border-2 border-red-600 bg-red-600 hover:bg-white hover:text-red-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )      
      }
      {
        noProducts &&(
          <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center text-3xl ">
            <p> No products found</p>
          </div>
        )
      }
    </div>
  );
};

export default SearchProduct;
