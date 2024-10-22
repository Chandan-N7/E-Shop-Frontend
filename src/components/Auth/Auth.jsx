import React, { useEffect, useState } from "react";
import Login from "../../Pages/AuthPages/Login";
import Signup from "../../Pages/AuthPages/Signup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {HashLoader} from "react-spinners"

const Auth = () => {
  const [authStatus, setAuthStatus] = useState("login");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user && user.verified) {
      navigate("/");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);
  return (
    <>
      {loading ? (
        <div>
          <HashLoader color="#ff0000" />
        </div>
      ) : (
        <div
          className={`w-full h-[85vh] flex items-center justify-center p-6 `}
        >
          {authStatus === "login" && <Login setAuthStatus={setAuthStatus} />}
          {authStatus === "signup" && <Signup setAuthStatus={setAuthStatus} />}
        </div>
      )}
    </>
  );
};

export default Auth;
