import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Detail from "../../Pages/ProductDetailPage.jsx/Detail";

const ProductDetails = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const { id } = useParams(); // Get the product ID from the URL
  const validate = products.find((product) => product._id === id);
  

  useEffect(() => {
    if(!id){
      navigate('*')
    }
    else if (!validate && products.length) {
      navigate('*');
    }
  }, [validate, products, navigate,id]);
  return (
    <div className="max-w-[1280px] m-auto my-5 py-3 px-3">
      <Detail id={id} />
    </div>
  );
};

export default ProductDetails;
