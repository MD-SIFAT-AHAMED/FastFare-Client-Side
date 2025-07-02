import { createBrowserRouter } from "react-router";
import MainLayout from "../Main/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Main/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import CoverAge from "../Pages/CoverAge/CoverAge";
import PrivateRouter from "../Routes/PrivateRouter";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayout from "../Main/DashBoardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: CoverAge,
        loader: () => fetch("./services.json"),
      },
      {
        path: "/sendparcel",
        loader: () => fetch("./services.json"),
        element: (
          <PrivateRouter>
            <SendParcel />
          </PrivateRouter>
        ),
      },
    ],
  },

  // DashboardLayOut Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashBoardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
    ],
  },

  // AuthLayout Routes
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/forgotPassword",
        Component: ForgotPassword,
      },
    ],
  },
]);
export default router;
