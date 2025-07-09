import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import FastFareLogo from "../Pages/Shared/FastFareLogo/FastFareLogo";
import {
  FaHome,
  FaBox,
  FaCreditCard,
  FaUserEdit,
  FaUserClock,
  FaUsers,
  FaUserShield,
  FaMotorcycle,
} from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import UseUserRole from "../Hooks/UseUserRole";

const DashBoardLayout = () => {
  const { role, roleLoading } = UseUserRole();

  return (
    <div className="max-w-screen-2xl w-11/12 mx-auto">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          <div className="navbar bg-base-200 w-full ">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 font-bold">Dashboard</div>
          </div>
          {/* Page content here */}
          <div className="p-3">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 **:hover:text-green-800">
            <Link to={"/"}>
              <div className="mb-3 w-fit">
                <FastFareLogo />
              </div>
            </Link>
            {/* Sidebar content here */}

            <li>
              <NavLink
                to={"/"}
                className="flex items-center gap-3 text-base py-2 "
              >
                <FaHome className="text-lg" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/myParcels"}
                className="flex items-center gap-3 text-base py-2 "
              >
                <FaBox className="text-lg" /> My Parcel
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/paymentHistory"}
                className="flex items-center gap-3 text-base py-2 "
              >
                <FaCreditCard className="text-lg" /> Payment History
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/track"}
                className="flex items-center gap-3 text-base py-2"
              >
                <HiOutlineLocationMarker className="text-lg" /> Track a Package
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/profile"}
                className="flex items-center gap-3 text-base py-2 "
              >
                <FaUserEdit className="text-lg" /> Update Profile
              </NavLink>
            </li>
            {!roleLoading && role === "admin" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/active-riders"}
                    className="flex items-center gap-3 text-base py-2"
                  >
                    <FaUsers className="text-lg" /> Active Riders
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/pending-riders"}
                    className="flex items-center gap-3 text-base py-2"
                  >
                    <FaUserClock className="text-lg" /> Pending Riders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/assignRider"}
                    className="flex items-center gap-3 text-base py-2"
                  >
                    <FaMotorcycle className="text-lg" /> Assign Rider
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/makeAdmin"
                    className="flex items-center gap-3 text-base py-2"
                    // className={({ isActive }) =>
                    //   `flex items-center gap-3 p-2 rounded-lg ${
                    //     isActive ? "bg-primary text-white" : "hover:bg-base-300"
                    // //   }`
                    // }
                  >
                    <FaUserShield className="text-lg" />
                    <span className="font-medium">Make Admin</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
