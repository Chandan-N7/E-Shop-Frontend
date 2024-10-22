import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import logo from "../../assets/file.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import profileImg from "../../assets/signin.gif";
import apiClient from "../../utils/api-client";
import { LOGOUT_ROUTES } from "../../utils/constant";
import { clearUser } from "../../redux/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const handleShowAuth = () => {
    if (!user || !user.verified) {
      navigate("/auth");
    } else navigate("/profile  ");
  };
  const handleCart = () => {
    if (user && user?.verified) {
      navigate("/cart");
    } else {
      navigate("/auth");
    }
  };
  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
    }
    setSearchInput("");
  };
  const logout = async () => {
    console.log("object")
    try {
      const response = await apiClient.post(LOGOUT_ROUTES,{}, { withCredentials: true });
      dispatch(clearUser())
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (cart?.items?.length) {
      setQuantity(cart?.items?.length);
    }
  }, [cart,user]);
  return (
    <div className="w-full shadow-lg bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-[1280px] ml-auto mr-auto py-3 px-3 ">
        <div className=" cursor-pointer ">
          <Link to={"/"} className="w-[50px] h-50[px] block">
            <img src={logo} alt="Logo" className="w-[50px]" />
          </Link>
        </div>
        <div className="flex items-center md:flex xsm:hidden">
          <input
            type="text"
            className="border-2 w-[25rem] p-1 border-r-0 rounded-tl-full rounded-bl-full outline-none border-[#7a7a7a] pr-4 pl-4"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // Trigger search on Enter key press
              }
            }}
          />
          <button
            className="border-2 border-red-600 p-1 text-[24px] rounded-tr-full rounded-br-full pr-4 pl-4 border-l-0 bg-red-600 text-white"
            onClick={handleSearch}
          >
            <IoIosSearch />
          </button>
        </div>
        <div>
          {user && user.verified ? (
            <div className="flex items-center gap-5">
              <img
                src={profileImg}
                alt=""
                className="w-[35px] cursor-pointer"
                onClick={handleShowAuth}
              />
              <button onClick={handleCart} className="text-2xl relative">
                <FaShoppingCart />
                <p className="bg-red-600 text-white rounded-full px-1 h-[16px] text-[0.7rem] absolute top-[-6px] right-[-10px] flex items-center justify-center">
                  {quantity}
                </p>
              </button>

              <button
                onClick={logout}
                className="border-2 border-red-600 py-1 text-[0.8rem] px-4 rounded-full bg-red-600 text-white hover:bg-[#fff] hover:text-black transition-all duration-300"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={handleShowAuth}
              className="border-2 border-red-600 py-1 text-[0.8rem] px-4 rounded-full bg-red-600 text-white hover:bg-[#fff] hover:text-black transition-all duration-300"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
