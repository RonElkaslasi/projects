import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { loginContext } from "../context/loginContext";
import Home from "../components/home/Home";
const LoginRoute = ({ element: Element, ...rest }) => {
  const { userData } = useContext(loginContext);
  // console.log(userData);
  if (!userData.user) {
    return <Element {...rest} />;
  }
  if (userData.user.roll === "professor") {
    return (
      <Navigate
        to="/professor-dashboard"
        state={{ needToLogin: false }}
        replace
      />
    );
  }
};

export default LoginRoute;
