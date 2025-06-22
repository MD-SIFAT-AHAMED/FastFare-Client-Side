import React from "react";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banner = () => {
  return (
    <div className="max-w-screen-2xl w-11/12 mx-auto">
      <Carousel autoPlay={true} showStatus={false} infiniteLoop={true} showThumbs={false}>
        <div>
          <img src={bannerImg1} />
        </div>
        <div>
          <img src={bannerImg2} />
        </div>
        <div>
          <img src={bannerImg3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
