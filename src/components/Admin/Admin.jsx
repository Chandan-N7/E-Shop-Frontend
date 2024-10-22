import React, { useEffect } from "react";
import user from "../../assets/signin.gif";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminUsers from "../../Pages/AdminPages/AdminUsers";
import AdminProducts from "../../Pages/AdminPages/AdminProducts";
import { useSelector } from "react-redux";
const Admin = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(state=>state.user.user)
  const handleProducts=()=>{
    navigate('products')
  }
  const handleUsers=()=>{
    navigate('users')
    
  }
  useEffect(()=>{
    if(!userInfo || !userInfo.verified || !userInfo.admin){
      navigate('/*')
    }
  },[])
  return (
    <div className="relative">
      <div className="flex gap-5 mt-3">
        <div className="bg-white w-[15%] h-[80vh] flex flex-col items-center sticky top-0">
          <div className="mt-5 cursor-pointer" onClick={()=>{navigate("/admin")}}>
            <img src={user} alt="profile img" width={50} /> <p>ADMIN</p>
          </div>{" "}
          <hr className="w-full border-1 border-[#000] mt-2" />
          <div className="mt-5 hover:text-[#e1002d] cursor-pointer w-[50%]" onClick={handleProducts}><p> Products</p></div>
          <div className="mt-2 hover:text-[#e1002d] cursor-pointer w-[50%]" onClick={handleUsers}><p> Users</p></div>
        </div>
        <div className="w-[100%]">
          <Routes>
            <Route path="products" element={<AdminProducts/>}/>
            <Route path="users" element={<AdminUsers/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
