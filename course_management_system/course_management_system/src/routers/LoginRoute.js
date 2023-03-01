import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { loginContext } from "../context/loginContext";
import Home from "../components/home/Home";
const LoginRoute = ({ element: Element, ...rest }) => {
  const { userData } = useContext(loginContext);

  if (!userData.user) {
    return <Element {...rest} />;
  }

  return <Navigate to="/home" state={{ needToLogin: false }} replace />;
};

export default LoginRoute;
