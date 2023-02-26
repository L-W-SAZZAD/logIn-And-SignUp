import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../UseContext/UseContext";
import Loading from "../Loading/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loading, user } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
