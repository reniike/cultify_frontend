// CultifyModal.js
import React from "react";
import "../styles/otp.css";
import "../styles/submitButton.css";

const CultifyModal = ({ subject, text, isDisplayed, onClose }) => {
  return (
    <React.Fragment>
      {isDisplayed ? (
        <div className="parentContainer">
          <div className="otpContainer">
            <h6 className="text-center mb-3">{subject}</h6>
            <p className="mb-3">{text}</p>
            <button className="closeButton" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default CultifyModal;
