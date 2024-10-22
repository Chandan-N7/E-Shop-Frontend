import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import profile from "../../assets/signin.gif";
import apiClient from "../../utils/api-client";
import { GET_ORDER_LIST_ROUTE } from "../../utils/constant";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.products.products);

  const handleAdmin = () => {
    if (user && user.verified && user.admin) {
      navigate("/admin");
    } else {
      toast.error(!user.verified && "verified false");
      toast.error(!user.admin && "false");
      console.log("object");
    }
  };
  const [orderItem, setOrderItem] = useState([]);
  useEffect(() => {
    const orderList = async () => {
      const response = await apiClient.get(GET_ORDER_LIST_ROUTE, {
        withCredentials: true,
      });
      setOrderItem(response.data);
    };
    orderList();
  }, []);

  useEffect(()=>{
    if(!user || !user.verified){
      navigate('/*')
    }
  },[])
  console.log(user)
  return (
    <div className="my-3 px-4 py-2 min-h-[85vh]">
      <div className=" border-b-2 border-slate-600 p-2 flex items-center gap-5">
        <img src={profile} alt="" className="w-[50px]" />
        <div className="text-[0.9rem] m-0">
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <h3 className="text-2xl px-2 py-2">Your Orders ({orderItem.length})</h3>
      <div className="flex flex-col gap-3">
        {orderItem.map((order, i) => (
          <div key={i} className="bg-white lg:flex gap-2">
            <div className="w-full border-b border-slate-400 lg:border-0 py-2 pb-5 px-5">
              <div>
                <p className="pb-2">
                  {new Date(order.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="flex flex-col gap-2">
                  {order.orderItems.map((item) => {
                    // Filter products to find the matching product by product ID
                    const filteredProduct = products.filter(
                      (product) => product._id === item.product
                    );
                    console.log(filteredProduct);

                    // If there's a matching product, display it
                    if (filteredProduct.length > 0) {
                      return (
                        <div key={item._id} className="flex gap-2">
                          <div className="bg-slate-200">
                            <img
                              src={filteredProduct[0]?.productImages[0]}
                              alt=""
                              className="w-[100px] h-[100px] object-cover mix-blend-multiply"
                            />
                          </div>
                          <div>
                            <p>
                              Product Name: {filteredProduct[0]?.productName}
                            </p>
                            <p className="text-red-600">
                              ₹
                              {(filteredProduct[0]?.productDisPrice).toFixed(2)}
                            </p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="lg:w-[400px] px-5 my-5">
              <div className=" h-[100%] lg:flex flex-col justify-between">
                <div className="mb-3">
                  <h3 className="font-semibold text-[1.1rem] mb-2">
                    Payment Details:
                  </h3>
                  <p>
                    Order Id:{" "}
                    <span className="text-slate-600 font-medium">
                      {order.razorpay_order_id}
                    </span>
                  </p>
                  <p>
                    Payment Id:{" "}
                    <span className="text-slate-600 font-medium">
                      {order.razorpay_payment_id}
                    </span>
                  </p>
                </div>
                <p className="font-semibold text-end mr-2">
                  Total Amount: ₹{(order.amount / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
