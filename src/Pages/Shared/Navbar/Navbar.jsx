import React, { useState } from "react";
import FastFareLogo from "../FastFareLogo/FastFareLogo";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { BsListNested } from "react-icons/bs";
import toast from "react-hot-toast";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, logOut } = useAuth();

  const links = (
    <>
      <li>Services</li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/sendparcel"}>Send A Parcel</NavLink>
      </li>
      <li>About Us</li>
      <li>Pricing</li>
      <li>
        <NavLink to={"beARider"}>Be a Rider</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/dashboard"}>
            <li>DashBoard</li>
          </NavLink>
        </li>
      )}
    </>
  );

  const handlerlLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Successfuly");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };
  return (
    <div className="bg-gray-100 py-5">
      <div className="max-w-screen-2xl w-11/12 mx-auto bg-base-100 rounded-xl p-3">
        <div className="flex justify-between items-center ">
          <div className="flex items-center">
            <div
              onClick={() => setMobileMenu((prev) => !prev)}
              className="flex items-center"
            >
              {mobileMenu ? (
                <span className="md:hidden mr-3 cursor-pointer ">
                  <RxCross1 size={20} />
                </span>
              ) : (
                <span className="md:hidden mr-3 cursor-pointer ">
                  <RxHamburgerMenu size={20} />
                </span>
              )}
            </div>
            <FastFareLogo />
          </div>
          <ul className="hidden md:flex items-center gap-4 text-[#606060] font-medium">
            {links}
          </ul>
          <div className="flex items-center space-x-2 ">
            {user ? (
              <button
                onClick={handlerlLogOut}
                className="rounded-xl btn btn-primary text-[#cbeb67] btn-outline font-bold hover:text-black px-[22px] py-[10px]"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link to={"/login"}>
                  <button className=" rounded-xl btn btn-primary text-[#cbeb67] btn-outline font-bold hover:text-black px-[22px] py-[10px]">
                    Sign In
                  </button>
                </Link>
                <Link to={"/register"}>
                  <button className="hidden lg:block bg-primary rounded-xl btn btn-primary btn-outline font-bold text-[#606060] px-[22px] py-[10px]">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out transform origin-top ${
            mobileMenu
              ? "max-h-96 scale-y-100 opacity-100"
              : "max-h-0 scale-y-0 opacity-0"
          }`}
        >
          <ul className="text-sm space-y-2 mt-4">{links}</ul>
          <div className="text-[#606060] flex flex-col gap-3 my-3">
            {user ? (
              <button
                onClick={handlerlLogOut}
                className="rounded-xl btn btn-primary text-[#cbeb67] btn-outline font-bold hover:text-black px-[22px] py-[10px]"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link to={"/login"}>
                  <button className=" rounded-xl btn btn-primary text-[#cbeb67] w-full btn-outline font-bold hover:text-black px-[22px] py-[10px]">
                    Sign In
                  </button>
                </Link>
                <Link to={"/register"}>
                  <button className="lg:block bg-primary rounded-xl btn btn-primary btn-outline font-bold text-[#606060] w-full px-[22px] py-[10px]">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
