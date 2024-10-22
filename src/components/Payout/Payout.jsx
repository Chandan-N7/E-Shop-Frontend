import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payout = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const paymentData = location.state?.paymentData;
  useEffect(()=>{
    if(!paymentData)[
        navigate('/')
    ]
  },[])
  return (
    <div>
        
    </div>
  );
};

export default Payout;
