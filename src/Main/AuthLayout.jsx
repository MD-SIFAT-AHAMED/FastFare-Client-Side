import React from "react";
import { Outlet } from "react-router";
import loginImg from "../assets/authImage.png";
import FastFareLogo from "../Pages/Shared/FastFareLogo/FastFareLogo";
const AuthLayout = () => {
  return (
    <div className="max-w-screen-2xl w-11/12 mx-auto">
      <div className="md:relative left-0 my-5">
        <FastFareLogo />
        <div className="absolute flex flex-col lg:flex-row-reverse min-h-screen">
          <div className="flex-1 flex items-center justify-center bg-[#FAFDF0]">
            <img src={loginImg} className="max-w-full rounded-lg " />
          </div>
          <div className="flex-1 flex items-center justify-center p-12">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
