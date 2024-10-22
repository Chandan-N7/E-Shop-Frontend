import VerticalCardProducts from "./AllProducts/VerticalCardProducts";
import HorizontalCardProducts from "./AllProducts/HorizontalCardProducts";

const ProductCards = () => {
  return (
    <div className="mx-auto px-4 my-6 relative">
      <HorizontalCardProducts category={'watches'} heading={"Popular's Watches"} />      
      <HorizontalCardProducts category={'earphones'} heading={"Popular's earphones"} />
      <HorizontalCardProducts category={'airpodes'} heading={"Top's Airpodes"} />
      <HorizontalCardProducts category={'trimmers'} heading={"Trimmers"} />
      <VerticalCardProducts category={'televisions'} heading={"Televisions"} />
      <VerticalCardProducts category={'camera'} heading={"Camera and Photography"} />
      <VerticalCardProducts category={'mobiles'} heading={"Mobiles"} />
      <VerticalCardProducts category={'Mouse'} heading={"Mouse"} />
      <VerticalCardProducts category={'refrigerator'} heading={"Refrigerator"} />
      <VerticalCardProducts category={'printers'} heading={"Printers"} />


    </div>
  );
};

export default ProductCards;
