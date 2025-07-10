import React from "react";
import useAuth from "../Hooks/useAuth";
import UseUserRole from "../Hooks/UseUserRole";
import { useNavigate } from "react-router";

const RiderRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = UseUserRole();
  const navigate = useNavigate();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner text-info"></span>;
  }

  if (!user || role !== "rider") {
    return navigate("/forbidden");
  }

  return children;
};

export default RiderRouter;
