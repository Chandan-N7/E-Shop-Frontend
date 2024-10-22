import React, { useState } from "react";
import signin from "../../assets/signin.gif";
import { toast } from "react-toastify";
import apiClient from "../../utils/api-client";
import { LOGIN_ROUTES } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setAuthStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validation = () => {
    if (!email) {
      toast.error("email is required");
      return false;
    }
    if (!password) {
      toast.error("password is required");
      return false;
    }
    return true;
  };
  const hadleLogin = async () => {
    if (validation()) {
      try {
        const response = await apiClient.post(
          LOGIN_ROUTES,
          { email, password },
          { withCredentials: true }
        );
        if (response.status === 201) {
          dispatch(setUser(response.data.user));
          toast.success("Login successful!");
          navigate("/");
        }
      } catch (error) {
        const err = error.response
          ? error.response.data.message
          : error.message;
        console.error("Error verifying OTP:", err);
        toast.error(err);
        setEmail("");
        setPassword("");
      }
    }
  };
  return (
    <div className="w-96 h-fit bg-white shadow-xl flex items-center rounded flex-col gap-[10px] 1xsm:gap-[10px] sm:gap-[5px] m-auto px-5 py-10 1xsm:px-10">
      <div className="mb-3">
        <div>
          <img src={signin} alt=" auth img" width={70} />
        </div>
      </div>
      <div className="w-full">
        <p className="text-[0.9rem]">Email:</p>
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="placeholder:text-[0.8rem] border-2 p-[5px] px w-[100%]  rounded-[5px] bg-[#e9eef1] focus:bg-white"
        />
      </div>
      <div className="w-full flex flex-col items-end">
        <div className="w-full">
        <p className="text-[0.9rem]">Password:</p>
        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="placeholder:text-[0.8rem] border-2 p-[5px] pl-4 pr-4 w-[100%]  rounded-[5px] bg-[#e9eef1] focus:bg-white"
        />
        </div>
      </div>
      <button
        className="border-2 p-[5px] pl-10 pr-10 rounded-full bg-[#E1002D] text-white border-[#E1002D] hover:bg-white hover:text-black transition-all duration-300 mt-3"
        onClick={hadleLogin}
      >
        Login
      </button>
      <p className="text-start w-full text-[0.9rem] mt-[10px]">
        Don't have account?{" "}
        <span
          className="text-[#E1002D] cursor-pointer"
          onClick={() => setAuthStatus("signup")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
