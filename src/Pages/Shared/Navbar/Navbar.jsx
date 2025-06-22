import React from "react";
import FastFareLogo from "../FastFareLogo/FastFareLogo";

const Navbar = () => {
  const links = (
    <>
      <li>Services</li>
      <li>Coverage</li>
      <li>About Us</li>
      <li>Pricing</li>
      <li>Be a Rider</li>
    </>
  );
  return (
    <div className="max-w-screen-2xl w-11/12 mx-auto my-5">
      <div className="flex justify-between items-center ">
        <div>
          <FastFareLogo />
        </div>
        <ul className="hidden md:flex items-center gap-4 text-[#606060] font-medium">{links}</ul>
        <div className="space-x-2 text-[#606060]">
          <button className="text-[20px] rounded-xl font-bold border-1 border-gray-300 px-[22px] py-[10px]">
            Sign In
          </button>
          <button className="text-[20px] rounded-xl font-bold border-1 border-gray-300 px-[22px] py-[10px] bg-[#caeb66]">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
