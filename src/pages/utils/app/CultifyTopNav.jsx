import React from "react";
import cultifyLogo from "../../../assets/images/cultifylogo.svg";
import backgroundImage from "../../../assets/images/backgroudimage.svg";
import { useNavigate } from "react-router-dom";

const CultifyTopNav = ({ content }) => {
const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-30 border-b">
        <div className="flex justify-between items-center mx-7 py-6">
          <div className="cursor-pointer" onClick={()=>navigate("/home")}>
            <img src={cultifyLogo} alt="Cultify Logo" className="w-20" />
          </div>
          <nav>
            <span 
              onClick={()=>navigate("/home")}
              className="text-lg cursor-pointer">Home</span>
          </nav>
        </div>
      </header>

      <div
        className="flex-grow bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {content}
      </div>
    </div>
  );
};

export default CultifyTopNav;
