import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header_nav">
        <img src="https://png.pngtree.com/png-vector/20211120/ourmid/pngtree-university-logo-png-image_4037518.png" />
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "header-active-link home-nav" : "home-nav"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/personal-dashboard"
          className={({ isActive }) => (isActive ? "header-active-link" : null)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) => (isActive ? "header-active-link" : null)}
        >
          Courses
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
