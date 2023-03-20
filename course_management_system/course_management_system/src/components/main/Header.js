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
  // console.log(userData);
  const onClickLogoutButton = () => {
    logoutFromSite(user.token).then((res) => {
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
    // if (userData.user !== null) {
    //   setIsLogin(true);
    // }
    if (Object.values(userData)[0] !== null) {
      setIsLogin(true);
    }
  }, [userData, setIsLogin]);

  const onClickDashboardButton = () => {
    deleteCourseFromCookie();
    console.log(user);
    if (user.role === "professor") navigate("/professor-dashboard");
    else if (user.role === "student") navigate("/student-dashboard");
    // if (user.user.role === "professor") navigate("/professor-dashboard");
    // else if (user.user.role === "student") navigate("/student-dashboard");
  };

  return (
    <div className="header-container">
      <div className="header_nav">
        {isLogin && (
          <div className="welcome-and-logout-container">
            <div className="welcome-dashboard">
              {/* Welcome, {userData.user.name} */}
              Welcome, {userData.user.name}
            </div>
            <button onClick={onClickDashboardButton}>Dashboard</button>
            <button onClick={onClickLogoutButton} className="logout-button">
              Logout
            </button>
          </div>
        )}
        <img src={myImage} onClick={onClickLogo} />
      </div>
    </div>
  );
};

export default Header;
