import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeNav = () => {
  const products = useSelector((state) => state.products.products);
  const [loading, setLoading] = useState(true);
  const categoryLoadingList = new Array(10).fill(null);
  // Create a Set to store unique categories and convert it to an array
  const uniqueCategories = [
    ...new Set(products.map((product) => product.productCategory)),
  ];

  // Find the first product image for each category
  const getCategoryImage = (category) => {
    const product = products.find((item) => item.productCategory === category);
    return product ? product.productImages[0] : null;
  };
  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  return (
    <>
      {loading ? (
        <div className="flex justify-between lg:gap-0 x xsm:gap-5 overflow-scroll hide-scrollbar">
        {categoryLoadingList.map((category, i) => {
          return (
            <div key={i} className="flex items-center flex-col gap-1 ">
              <div className="border w-[70px] h-[70px] flex items-center justify-center rounded-full bg-slate-300 cursor-pointer overflow-hidden p-4">
                
              </div>
              <h3 className="w-full h-[22px] bg-slate-200 rounded animate-pulse"></h3>
            </div>
          );
        })}
      </div>
      ) : (
        <div className="flex justify-between lg:gap-0 x xsm:gap-5 overflow-scroll hide-scrollbar">
          {uniqueCategories.map((category, i) => {
            const categoryImage = getCategoryImage(category);
            return (
              <Link to={`/product-category?category=`+category} key={i} className="flex items-center flex-col gap-1 ">
                <div className="border w-[70px] h-[70px] flex items-center justify-center rounded-full bg-slate-300 cursor-pointer overflow-hidden p-4">
                  {categoryImage && (
                    <img
                      src={categoryImage}
                      alt={category}
                      className="w-[50px] h-[50px] object-contain bg-slate-50 mix-blend-multiply transition-transform duration-300 ease-in-out transform hover:scale-125"
                    />
                  )}
                </div>
                <h3 className="text-[0.9rem]">{category}</h3>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default HomeNav;
