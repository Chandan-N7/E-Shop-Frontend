import React, { useState } from "react";
import signin from "../../assets/signin.gif";
import { toast } from "react-toastify";
import axios from "axios";
import apiClient from "../../utils/api-client";
import { CREATE_ROUTES } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = ({ setAuthStatus }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const validation = () => {
    if (!name) {
      toast.error("name is required");
      return false;
    }
    if (!email) {
      toast.error("email is required");
      return false;
    }
    if (!password) {
      toast.error("password is required");
      return false;
    }
    if (password !== cpassword) {
      toast.error("confirm and password should be same");
      return false;
    }
    return true;
  };
  const hadleSignUp = async () => {
    if (validation()) {
        try {
          const response = await apiClient.post(
            CREATE_ROUTES,
            { name, email, password },
            { withCredentials: true }
          );
          console.log(response.status);
          if (response.status === 200) {
            dispatch(setUser(response.data.user));
            navigate("/auth/verify-email");
          }
        } catch (error) {
          const err = error.response
            ? error.response.data.message
            : error.message;
          console.error("Error verifying OTP:", err);
          toast.error(err);
          setEmail('')
          setCpassword('')
          setPassword('')
          setName('')
        }
    }
  };
  return (
    <div className="w-96 h-fit bg-white shadow-xl flex items-center rounded flex-col gap-[10px] px-5 pb-5 pt-3 1xsm:px-10">
      <div className="mb-3">
        <div>
          <img src={signin} alt=" auth img" width={70} />
        </div>
      </div>
      <div className="w-full">
        <p className="text-[0.9rem]">Name:</p>
        <input
          type="text"
          placeholder="enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="placeholder:text-[0.8rem] border-2 p-[5px] pl-4 pr-4 w-[100%]  rounded-[5px] bg-[#e9eef1] focus:bg-white"
        />
      </div>
      <div className="w-full">
        <p className="text-[0.9rem]">Email:</p>
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="placeholder:text-[0.8rem] border-2 p-[5px] pl-4 pr-4 w-[100%]  rounded-[5px] bg-[#e9eef1] focus:bg-white"
        />
      </div>
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
      <div className="w-full">
        <p className="text-[0.9rem]">Confirm Password:</p>
        <input
          type="password"
          placeholder="enter confirm password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
          className="placeholder:text-[0.8rem] border-2 p-[5px] pl-4 pr-4 w-[100%]  rounded-[5px] bg-[#e9eef1] focus:bg-white"
        />
      </div>
      <button
        className="border-2 p-[5px] pl-10 pr-10 rounded-full bg-[#E1002D] text-white border-[#E1002D] hover:bg-white hover:text-black transition-all duration-300 mt-3"
        onClick={hadleSignUp}
      >
        Sign up
      </button>
      <p className="text-start w-full text-[0.9rem] mt-[10px]">
        Already have account?{" "}
        <span
          className="text-[#E1002D] cursor-pointer"
          onClick={() => setAuthStatus("login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
