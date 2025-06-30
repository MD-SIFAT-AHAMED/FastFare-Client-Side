import { createBrowserRouter } from "react-router";
import MainLayout from "../Main/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Main/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import CoverAge from "../Pages/CoverAge/CoverAge";

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
    ],
  },
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
