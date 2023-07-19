import React from "react";
import cultifyLogo from "../../../assets/logo.svg";
import dropDown from "../assets/dropDownIcon.svg";
import { useNavigate } from "react-router-dom";
import "../styles/topNav.css";

const SuperAdminTopNavBar = () => {
  const navigate = useNavigate();
  return (
    <header className="h-20 border-b ">
      <div className="flex justify-between items-center mx-7 py-6 ">
        <div>
          <img
            src={cultifyLogo}
            alt="Cultify Logo"
            className=" w-20"
            onClick={() => {
              navigate("/home");
            }}
          />
        </div>
        <nav>
          <img src={dropDown} className="drop" alt="drop" />
        </nav>
      </div>
    </header>
  );
};

export default SuperAdminTopNavBar;
