import React from "react";
import { formatToINRCurrency } from "../../utils/currency";
import apiClient from "../../utils/api-client";
import { CHECKOUT_ROUTE, HOST, SUCCESS_ROUTE } from "../../utils/constant";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const TotalAmount = ({ totalPrice, totalQuantity, data }) => {
  const userInfo = useSelector(state=>state.user.user)
  const handleCheckOut = async () => {
    if(totalPrice > 40000){
      return toast.info("max limit is 40000")
    }
    if (totalPrice && totalPrice <= 40000) {
      try {
        const response = await apiClient.post(
          CHECKOUT_ROUTE,
          { amount: totalPrice },
          { withCredentials: true }
        );
        const options = {
          key: "rzp_test_v5zvGJ7BDazVlH", // Replace with your Razorpay key_id
          amount: response.data.amount, // The amount in paise from the backend
          currency: "INR",
          name: "E-SHOP",
          description: "payment for E-SHOP",
          order_id: response.data.id, // Use the order_id created from Razorpay backend
          callback_url:`${HOST + SUCCESS_ROUTE}?cartData=${encodeURIComponent(JSON.stringify(data))}&userId=${userInfo.id}&amount=${response.data.amount}`, // Your success URL
          prefill: {
            name: "", // Force empty
            email: "", // Force empty
            contact: "9999999999", // Force empty
          },
          notes:{
            address: "Razopay Corporate Office"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {}
    }
  };
  console.log(totalPrice)

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-3xl font-medium">Total Price</h3>
      <div className="my-[20px] flex flex-col justify-between w-full gap-5">
        <p className="text-lg font-medium">
          Subtotal({totalQuantity} item):{" "}
          <b>{formatToINRCurrency(totalPrice).replace(/\.00$/, "")}</b>
        </p>
        <button
          className="bg-blue-600  text-white border-2 border-blue-600 hover:text-blue-600 hover:bg-white p-1 w-full "
          onClick={handleCheckOut}
        >
          Proceed to Buy
        </button>
        {totalPrice > 40000 && 
        <p>Note: For security reasons, we currently accept payments up to ₹40,000 per transaction.</p>
      }
      </div>
    </div>
  );
};

export default TotalAmount;
