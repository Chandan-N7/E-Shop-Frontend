import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../../utils/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import apiClient from "../../utils/api-client";
import { UPLOAD_PRODUCT_ROUTE } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";



const ProductUpload = ({ upload, setUpload }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [data, setData] = useState({
    productName: "",
    productBrand: "",
    productCategory: "",
    productImages: [],
    productPrice: "",
    productDisPrice: "",
    productDescription: "",
  });

  const [imagePreview, setImagePreview] = useState([]); // for image preview

  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload and preview
  const handleUploadProductImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview((prev) => [...prev, previewUrl]); // add new image preview URL
      setData((prev) => ({
        ...prev,
        productImages: [...prev.productImages, file], // add file to the state
      }));
    }
  };

  const handleDeleteImage = (index) => {
    const updatedPreview = imagePreview.filter((_, i) => i !== index);
    const updatedFiles = data.productImages.filter((_, i) => i !== index);
    setImagePreview(updatedPreview);
    setData((prev) => ({
      ...prev,
      productImages: updatedFiles,
    }));
  };
  const handleUploadProduct =async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productBrand", data.productBrand);
    formData.append("productCategory", data.productCategory);
    formData.append("productPrice", data.productPrice);
    formData.append("productDisPrice", data.productDisPrice);
    formData.append("productDescription", data.productDescription);

    // Append all images to form data
    data.productImages.forEach((image, index) => {
      formData.append(`productImages`, image);
    });
    try {
        const response = await apiClient.post(UPLOAD_PRODUCT_ROUTE, formData);        
        toast.success('Product uploaded successfully');
        setData({
          productName: "",
          productBrand: "",
          productCategory: "",
          productImages: [],
          productPrice: "",
          productDisPrice: "",
          productDescription: "",
        });
        setImagePreview([]);
      } catch (error) {
        toast.error('Product upload error');
        console.error("Error uploading product", error);
        setData({
          productName: "",
          productBrand: "",
          productCategory: "",
          productImages: [],
          productPrice: "",
          productDisPrice: "",
          productDescription: "",
        });
        setImagePreview([]);

      }
  }
  return ( 
    <div className="w-[100%] h-[90vh] absolute top-0 left-0 flex items-center justify-center bg-slate-200 bg-opacity-35 ">
      <div className="bg-white w-full max-w-2xl h-full max-h-[80%] p-4 rounded overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-2xl font-semibold">Upload Product</h3>
          <p
            className="text-3xl cursor-pointer hover:text-red-600"
            onClick={() => {
              setUpload(false);
            }}
          >
            <IoClose />
          </p>
        </div>
        <form className="grid p-4 gap-1 overflow-y-scroll h-full pb-5" onSubmit={handleUploadProduct}>
          <label htmlFor="productName">Product Name : </label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            required
            className="p-1 bg-slate-100 border rounded"
          />

          <label htmlFor="productBrand" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="productBrand"
            placeholder="Enter brand name"
            name="productBrand"
            value={data.productBrand}
            onChange={handleOnChange}
            required
            className="p-1 bg-slate-100 border rounded"
          />

          <label htmlFor="productCategory" className="mt-3">
            Category :
          </label>
          <select
            name="productCategory"
            value={data.productCategory}
            id="productCategory"
            onChange={handleOnChange} // Add onChange for select
            required
            className="p-1 bg-slate-100 border rounded"
          >
            <option value="" disabled>Select a category</option> {/* Placeholder option */}
            {productCategory.map((el, i) => (
              <option value={el.value} key={el.value + el.id}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImages" className="mt-3">
            Product Images :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex items-center justify-center cursor-pointer">
              <div className="text-slate-500 flex flex-col items-center justify-center gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProductImage}
                  accept="image/*"
                />
              </div>
            </div>
          </label>

          <div className="flex gap-2">
            {/* Display image preview */}
            {imagePreview.map((img, i) => (
          <div
            key={i}
            className="relative w-[80px] h-[80px] bg-slate-100 border rounded group"
          >
            <img
              src={img}
              alt={`Product Preview ${i + 1}`}
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => handleDeleteImage(i)}
              className="absolute top-0 right-0 m-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
          </div>
          <label htmlFor="productPrice" className="mt-3">
            Product Price :
          </label>
          <input
            type="number"
            id="productPrice"
            placeholder="Enter product price "
            name="productPrice"
            value={data.productPrice}
            onChange={handleOnChange}
            required
            className="p-1 bg-slate-100 border rounded"
          />
          <label htmlFor="productDisPrice" className="mt-3">
            Product Discount Price :
          </label>
          <input
            type="number"
            id="p"
            placeholder="Enter discount price"
            name="productDisPrice"
            value={data.productDisPrice}
            onChange={handleOnChange}
            required
            className="p-1 bg-slate-100 border rounded"
          />

          <label htmlFor="productDescription" className="mt-3">
            Product Description :
          </label>
          <input
            type="text"
            id="productDescription"
            placeholder="Enter product discription"
            name="productDescription"
            value={data.productDescription}
            onChange={handleOnChange}
            required
            className="p-1 bg-slate-100 border rounded"
          />
          <button type="submit" className="bg-red-600 p-2 text-white font-medium mb-5 border rounded ">Upload Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpload;
