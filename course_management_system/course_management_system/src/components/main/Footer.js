import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <NavLink to="/home">About Us</NavLink>
      <NavLink to="/home">Contect Us</NavLink>
    </div>
  );
};

export default Footer;
