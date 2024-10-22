import React, { useEffect, useState } from "react";
import SideBar from "../../Pages/CategoryProductPage/SideBar";
import ProductSide from "../../Pages/CategoryProductPage/ProductSide";
import apiClient from "../../utils/api-client";
import { FILTER_PRODUCT } from "../../utils/constant";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search) 
  const urlCAtegoryArray = urlSearch.getAll("category")
  const urlCategoryListObject = {}
  urlCAtegoryArray.forEach(el=>{
    urlCategoryListObject[el] = true
  })
  // console.log(urlCategoryListObject)
  const [data, setData] = useState([]);
  const [selectCategory, setSelectCetegory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  


  const filterProduct = async () => {
    const response = await apiClient.post(FILTER_PRODUCT, {
      category : filterCategoryList,
    });
    const dataResponse =response.data.data
    setData(dataResponse)
    
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCetegory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };
  const handleSortBy = (e) => {
    const { value } = e.target;
  
    setData((prevData) => {
      const sortedData = [...prevData]; // Make a copy of the previous state
  
      if (value === "ase") {
        // Ascending order sort
        sortedData.sort((a, b) => a.productDisPrice - b.productDisPrice);
      } else if (value === "dse") {
        // Descending order sort
        sortedData.sort((a, b) => b.productDisPrice - a.productDisPrice);
      }
  
      return sortedData; // Return the sorted data to update the state
    });
  };
  

  useEffect(() => {
    filterProduct();
  }, [filterCategoryList]);
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);
    // url change
    const urlFormat = arrayOfCategory.map((el,i)=>{
      if((arrayOfCategory.length - 1) === i){
        return `category=${el}`
      }
      return `category=${el}&&`
    })
    navigate("/product-category?"+urlFormat.join(""))
  }, [selectCategory]);
  return (
    <div className="p-4">
      <div className=" lg:grid grid-cols-[200px,1fr] relative gap-2">
        {/* Left Side */}
        <div className="hidden lg:block bg-white p-2 h-[calc(100vh-120px)] overflow-y-scroll sticky top-[100px]">
          <SideBar
            handleSelectCategory={handleSelectCategory}
            selectCategory={selectCategory}
            handleSortBy = {handleSortBy}
          />
        </div>
        {/* right side */}
        <div>
          <ProductSide allProducts={data} />
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
