import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import { toast } from "react-toastify";
import apiClient from "../../utils/api-client";
import { RESENDOTP_ROUTES, VERIFYOTP_ROUTES } from "../../utils/constant";

const AuthOTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");

  const validateInput = () => {
    if (!first || !second || !third || !fourth) {
      toast.error("Input fields cannot be empty");
      return false;
    }
    return true;
  };
  const verifyOTP = async () => {
    const otp = first + second + third + fourth;
    if (validateInput()) {
      try {
        const response = await apiClient.post(
          VERIFYOTP_ROUTES,
          {
            otp,
            email: user.email,
          },
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast.success("OTP verification completed");
          dispatch(setUser(response.data.user))
          navigate("/");
        }
      } catch (error) {
        const err = error.response
          ? error.response.data.message
          : error.message;
        console.error("Error verifying OTP:", err);
        toast.error(err);
        setFirst("")
        setSecond("")
        setThird("")
        setFourth("")
      }
    }
  };

  const handleResendOTP = async () => {
    const otp = first + second + third + fourth;
   try {
    const response = await apiClient.post(RESENDOTP_ROUTES, {
      otp,
      email: user.email,
    });
    toast.success("New OTP sent to your email. Please verify.");

   } catch (error) {
    console.log(error)
   }
  };
  console.log(user);
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth");
  //   }
  //   else if (user &&   user.verifed ) {
  //     navigate("*");
  //   }
  // }, [user, navigate]);
  return (
    <div className="absolute w-[100vw] h-[100vh] z-50 top-0 left-0 backdrop-blur-3xl flex items-center justify-center">
      <div className="text-center w-[300px] 1xsm:w-[430px] px-4 pt-[80px] pb-[50px] flex flex-col items-center bg-white shadow-black rounded-[10px] gap-[5px] font-light m-5">
        <div className="flex items-center justify-center mb-[20px]">
          <MdMarkEmailRead className="text-[5rem] text-[#1e8a47]" />
        </div>
        <h3>Please check your email</h3>
        <p className="text-[0.7rem] 1xsm:text-[0.9rem]">We've sent a code to {user?.email}</p>
        <div className="flex gap-[10px] 1xsm:gap-[20px] mt-[18px]">
          <input
            type="text"
            maxLength="1"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            className="no-arrows text-[30px] px-[15px]  w-[50px] h-[50px] 1xsm:w-[70px] 1xsm:h-[70px] 1xsm:text-[40px] text-center font-medium rounded-[10px] border-2 border-[#1e8a47]"
          />
          <input
            type="text"
            maxLength="1"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            className="no-arrows text-[30px] px-[15px]  w-[50px] h-[50px] 1xsm:w-[70px] 1xsm:h-[70px] 1xsm:text-[40px] text-center font-medium rounded-[10px] border-2 border-[#1e8a47]"
          />
          <input
            type="text"
            maxLength="1"
            value={third}
            onChange={(e) => setThird(e.target.value)}
            className="no-arrows text-[30px] px-[15px]  w-[50px] h-[50px] 1xsm:w-[70px] 1xsm:h-[70px] 1xsm:text-[40px] text-center font-medium rounded-[10px] border-2 border-[#1e8a47]"
          />
          <input
            type="text"
            maxLength="1"
            value={fourth}
            onChange={(e) => setFourth(e.target.value)}
            className="no-arrows text-[30px] px-[15px]  w-[50px] h-[50px] 1xsm:w-[70px] 1xsm:h-[70px] 1xsm:text-[40px] text-center font-medium rounded-[10px] border-2 border-[#1e8a47]"
          />
        </div>
        <p className="mb-[40px] text-[0.8rem] 1xsm:text-[1rem]">
          Didn't get the code?{" "}
          <span
            className="text-[#1e8a47] cursor-pointer"
            onClick={handleResendOTP}
          >
            Click to resend
          </span>
        </p>
        <div className="flex gap-[15px] 1xsm:gap-[30px] justify-evenly">
          <button
            className="border-2 border-[#000] p-2 px-5 1xsm:px-10"
            onClick={() => navigate("/auth")}
          >
            Cancle
          </button>
          <button
            onClick={verifyOTP}
            className="border-2 border-[#1e8a47] bg-[#1e8a47] text-white p-2 px-5 1xsm:px-10 hover:text-[#1e8a47] hover:bg-white transition-all duration-300"
          >
            {" "}
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthOTP;
