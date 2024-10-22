import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductUpload from "./ProductUpload";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import apiClient from "../../utils/api-client";
import { DELETE_PRODUCT_ROUTE } from "../../utils/constant";
import { deleteProduct } from "../../redux/slices/ProductsSlice";


const AdminProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [upload, setUpload] = useState(false);
  const handleUploadProduct = () => {
    setUpload(true);
  };
  const handleDelete = async(id)=>{
    if(!id){
      toast.error("Product can't be deleted")
    }else{
      const response = await apiClient.delete(`${DELETE_PRODUCT_ROUTE}/${id}`)
      dispatch(deleteProduct(id))
      toast.success("Product Deleted")
    }
  }
  return (
    <div>
      <div className="bg-white flex items-center justify-between p-2 pr-4 pl-4">
        <p>All Products</p>
        <button
          onClick={handleUploadProduct}
          className="border-2 border-[#E1002D] p-1 pr-5 pl-5 rounded-full bg-[#E1002D] text-white hover:bg-[#fff] hover:text-black transition-all duration-300"
        >
          Upload Product
        </button>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-5 items-center ">
        {products &&
          products.map((item, i) => (
            <div key={i} className="bg-white p-2 rounded pb-8 relative">

              <div className="w-full flex items-center justify-center ">
                <img
                  src={item.productImages[0]}
                  alt=""
                  className="bg-white object-contain w-[150px] h-[150px] "
                />
                </div>
                <h3 className="text-[0.8rem] mt-1">
                  {item.productName.length > 20
                    ? `${item.productName.slice(0, 15)}...`
                    : item.productName}
                </h3>
                <p>₹{item.productDisPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }).replace('₹', '')}</p>
                <button className="p-[4px] text-[1.5rem] text-green-500 absolute bottom-1 right-1">
                <MdEdit/>
                </button>
                <button 
                onClick={()=>handleDelete(item._id)}
                className="p-[4px] text-[1.5rem] text-red-500 absolute top-1 right-1">
                <MdDelete/>
                </button>
              
            </div>
          ))}
      </div>
      {upload && <ProductUpload upload={upload} setUpload={setUpload} />}
    </div>
  );
};

export default AdminProducts;
