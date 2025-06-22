import React from "react";
import Marquee from "react-fast-marquee";
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import randstad from "../../../assets/brands/randstad.png";
import moonstar from "../../../assets/brands/moonstar.png";
import start_people from "../../../assets/brands/start-people 1.png";
import startfrom from "../../../assets/brands/start.png";
const logos = [
  amazon,
  amazon_vector,
  casio,
  randstad,
  moonstar,
  start_people,
  startfrom,
];
const ClientLogoMarquee = () => {
  return (
    <div className="max-w-screen-2xl w-11/12 mx-auto my-10">
      <div>
        <h2 className="text-2xl md:text-[28px] text-center text-[#03373D] font-bold my-10">We've helped thousands of sales teams</h2>
        <Marquee speed={40} pauseOnHover={true} gradient={false}>
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Service Logo"
              className="mx-10"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default ClientLogoMarquee;
