import React from "react";
import productCategory from "../../utils/productCategory";

const SideBar = ({handleSelectCategory,selectCategory, handleSortBy}) => {
  return (
    <>
      <div className="">
        <h3 className="text-lg uppercase font-medium text-slate-500 border-b border-slate-500 pb-2">
          Sort By
        </h3>
        <form className="text-sm flex flex-col gap-2 py-2">
          <div className="flex ic gap-3">
            <input className="cursor-pointer" type="radio" name="sort" id="Lsort" value={"ase"} onChange={handleSortBy}/>
            <label className="cursor-pointer" htmlFor="Lsort">Price - Low to High</label>
          </div>
          <div className="flex ic gap-3">
            <input className="cursor-pointer" type="radio" name="sort" id="Hsort" value={"dse"} onChange={handleSortBy}/>
            <label className="cursor-pointer" htmlFor="Hsort">Price - High to Low</label>
          </div>
        </form>
      </div>
      
      {/* filter by */}
      <div className="">
        <h3 className="text-lg uppercase font-medium text-slate-500 border-b border-slate-500 pb-2">
          Filter By
        </h3>
        <form className="text-sm flex flex-col gap-2 py-2">
          {
            productCategory?.map((category, i)=>(
              <div key={i} className=" flex items-center gap-3">
                <input className="cursor-pointer" type="checkbox" name="category" id={category?.value} value={category?.value} checked={!!selectCategory[category?.value]} onChange={handleSelectCategory}/>
                <label className="cursor-pointer" htmlFor={category?.value}>{category?.label} </label>
              </div>
            ))
          }
        </form>
      </div>
    </>
  );
};

export default SideBar;
