import React from "react";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router";
import UseUserRole from "../Hooks/UseUserRole";

const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = UseUserRole();
  const navigate = useNavigate();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner text-info"></span>;
  }

  if (!user || role !== "admin") {
    return navigate("/forbidden");
  }
  return children;
};

export default AdminRouter;
