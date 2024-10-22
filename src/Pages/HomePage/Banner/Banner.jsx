import React from "react";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../../assets/img1.webp";
import banner2 from "../../../assets/img2.webp";
import banner3 from "../../../assets/img3.jpg";
import banner4 from "../../../assets/img4.jpg";
import banner5 from "../../../assets/img5.webp";
import Mbanner1 from "../../../assets/img1_mobile.jpg";
import Mbanner2 from "../../../assets/img2_mobile.webp";
import Mbanner3 from "../../../assets/img3_mobile.jpg";
import Mbanner4 from "../../../assets/img4_mobile.jpg";
import Mbanner5 from "../../../assets/img5_mobile.png";

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, 
  };

  return (
    <>
      <div className="banner-carousel mt-7 hidden sm:block ">
        <Slider {...settings}>
          <div className="w-full h-72">
            <img
              src={banner5}
              alt="Banner 5"
              className="w-full h-full object-cover lg:object-cover xsm:object-fill"
            />
          </div>
          <div className="w-full h-72">
            <img
              src={banner2}
              alt="Banner 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-72">
            <img
              src={banner3}
              alt="Banner 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-72">
            <img
              src={banner4}
              alt="Banner 4"
              className="w-full h-full object-cover"
            />
          </div>
        </Slider>
      </div>
      <div className="banner-carousel mt-7 block sm:hidden ">
        <Slider {...settings}>
          <div className="w-full h-52 1xsm:h-64">
            <img
              src={Mbanner5}
              alt="Banner 5"
              className="w-full h-full  object-fill"
            />
          </div>
          <div className="w-full h-52 1xsm:h-64">
            <img
              src={Mbanner2}
              alt="Banner 2"
              className="w-full h-full object-fill sm:object-cover"
            />
          </div>
          <div className="w-full h-52 1xsm:h-64">
            <img
              src={Mbanner3}
              alt="Banner 3"
              className="w-full h-full object-fill sm:object-cover"
            />
          </div>
          <div className="w-full h-52 1xsm:h-64">
            <img
              src={Mbanner4}
              alt="Banner 4"
              className="w-full h-full object-fill sm:object-cover "
            />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Banner;
