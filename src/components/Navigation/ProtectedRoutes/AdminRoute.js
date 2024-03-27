import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//check if user is login or not

export const AdminRoute = ({ component: Component }) => {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  return (
    <>{userAuth?.isAdmin ? <Component /> : <Navigate to="/login" replace />}</>
  );
};
