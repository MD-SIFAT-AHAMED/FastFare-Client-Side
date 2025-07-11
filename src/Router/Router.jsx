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
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/pendingRiders/PendingRiders";
import ActiveRider from "../Pages/Dashboard/ActiveRider/ActiveRider";
import MakeAdmin from "../Pages/Dashboard/MakeAdimin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRouter from "../Routes/AdminRouter";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import RiderRouter from "../Routes/RiderRouter";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";

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
        path: "forbidden",
        Component: Forbidden,
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
      {
        path: "beARider",
        loader: () => fetch("./services.json"),
        element: (
          <PrivateRouter>
            <BeARider />
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
        index: true,
        Component: MyParcels,
      },
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "track",
        Component: TrackParcel,
      },
      // Rider only routes
      {
        path: "pendingDeliveries",
        element: (
          <RiderRouter>
            <PendingDeliveries />
          </RiderRouter>
        ),
      },

      // Admin only routes
      {
        path: "pending-riders",
        element: (
          <AdminRouter>
            <PendingRiders />
          </AdminRouter>
        ),
      },
      {
        path: "active-riders",
        element: (
          <AdminRouter>
            <ActiveRider />
          </AdminRouter>
        ),
      },
      {
        path: "makeAdmin",
        element: (
          <AdminRouter>
            <MakeAdmin />
          </AdminRouter>
        ),
      },
      {
        path: "AssignRider",
        element: (
          <AdminRouter>
            <AssignRider />
          </AdminRouter>
        ),
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
