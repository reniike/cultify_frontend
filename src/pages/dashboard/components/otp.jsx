import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/otp.css";
import CultifyTopNav from "../../dashboard/components/cultifyTopNav";
import axios from "../../../api/axios";
import { useLocation } from "react-router-dom";
import '../styles/submitButton.css'
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Otp = () => { 
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [toastResponse, setToastResponse] = useState("");
  const email = location.state;
  
  const showToast = () => {
    toast(toastResponse, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Invalid OTP. Please enter a 6-digit numeric OTP.");
      return;
    }
    else{
      setIsLoading(true);
      verifyOtp();
    }
  };

  const verifyOtp = async ()=>{
    const request = {
      emailAddress: email,
      otp: otp
    };
    try {
      const response = await axios.post("/investor/confirmRegistration", request);
      const data = response.data;
      console.log(data);
      setToastResponse("You have been registered successfully!")
      navigate("/investor/dashboard", {state: data});
    } catch (error) {
      setIsLoading(false);
      if(error.response.status === 400){        
        setError(error.response.data);
      }
      console.log(error);
    }
  }
  
  useEffect(() => {
    if (email == null) {
      navigate("/registration");
    }
    if (toastResponse) {
      showToast();
    }
  }, [toastResponse]);

  return (
    <CultifyTopNav
      content={
        <div className="otpContainer">
          <h6 className="text-center mb-3">
            Verity your<span> OTP</span>
          </h6>
          <p className="mb-3">
            {" "}
            Please check your email for the one-time password(OTP) <br /> to
            complete the verification process.
          </p>
          <div>
            <div className="form-group">
              <label htmlFor="otp">Enter your OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
              />
            </div>
            <a href="#">Resend OTP</a>
            <p className="error">{error}</p>
            <button 
                type="submit"
                className={`btn-submit ${isLoading ? "loading" : ""}`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? <div className="loading-indicator"></div> : "Verify"}
            </button>
            <ToastContainer />
          </div>
        </div>
      }
    />
  );
};

export default Otp;
