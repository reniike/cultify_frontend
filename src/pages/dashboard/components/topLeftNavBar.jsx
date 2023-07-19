import React from "react";
import cultifyLogo from "../../../assets/logo.svg";
import dropDown from "../assets/dropDownIcon.svg";
import { useNavigate } from "react-router-dom";
import "../styles/topNav.css";

const TopLeftNavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="top-nav-container fixed top-0 left-0 w-full z-50">
      <div className="top-nav bg-white shadow-md p-2 md:p-5 mx-auto h-14 flex justify-between items-center">
        <img
          src={cultifyLogo}
          className="logo h-10 w-30 cursor-pointer"
          alt="Logo"
          onClick={() => {
            navigate("/home");
          }}
        />
        <img src={dropDown} className="drop" alt="drop" />
      </div>
    </nav>
  );
};

export default TopLeftNavBar;
