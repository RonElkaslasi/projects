import myImage from "../../assets/img/vecteezy_university-education-logo-design-vector-template_6470501.jpg";

import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAction } from "../../actions/loginAction";
import { logoutFromSite } from "../../api/loginApi";
import { loginContext } from "../../context/loginContext";
import {
  deleteCourseFromCookie,
  deleteUserFromCookie,
  getUserFromCookie,
} from "../../cookies/cookies";

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useContext(loginContext);
  const [isLogin, setIsLogin] = useState(false);
  const user = getUserFromCookie();
  const { dispatchUserData } = useContext(loginContext);

  const onClickLogoutButton = () => {
    console.log(user);
    console.log(userData);
    logoutFromSite(user.token).then((res) => {
      console.log(res);
      dispatchUserData(logoutAction());
      deleteUserFromCookie();
      deleteCourseFromCookie();
      setIsLogin(false);
      navigate("/login");
    });
  };

  const onClickLogo = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (userData.user !== null) {
      setIsLogin(true);
    }
  }, [userData, setIsLogin]);

  const onClickDashboardButton = () => {
    deleteCourseFromCookie();
    if (user.user.roll === "professor") navigate("/professor-dashboard");
    else if (user.user.roll === "student") navigate("/student-dashboard");
  };

  return (
    <div className="header-container">
      <div className="header_nav">
        {isLogin && (
          <div className="welcome-and-logout-container">
            <div className="welcome-dashboard">
              Welcome, {userData.user.name}
            </div>
            <button onClick={onClickLogoutButton}>Logout</button>
            <button onClick={onClickDashboardButton}>Dashboard</button>
          </div>
        )}
        <img src={myImage} onClick={onClickLogo} />
      </div>
    </div>
  );
};

export default Header;
