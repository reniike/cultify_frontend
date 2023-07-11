import React from "react";
import cultifyLogo from "../../../assets/images/cultifylogo.svg";
import backgroundImage from "../../../assets/images/backgroudimage.svg";

const CultifyTopNav = ({ content }) => {
  return (
    <div className="overflow-hidden">
      <header className="h-30 border-b">
        <div className="flex justify-between items-center mx-7 py-6">
          <div>
            <img src={cultifyLogo} alt="Cultify Logo" className=" w-20" />
          </div>
          <nav>
            <span className=" text-lg">Home</span>
          </nav>
        </div>
      </header>

      <div
        className="min-h-screen bg-no-repeat bg-cover bg-center "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {content}
      </div>
    </div>
  );
};

export default CultifyTopNav;
