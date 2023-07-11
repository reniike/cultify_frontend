import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/otp.css";
import CultifyTopNav from "../../dashboard/components/cultifyTopNav";
import axios from "../../../api/axios";

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const email = localStorage.getItem("email");

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
      setButtonIsDisabled(true);
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
      alert("Registration successful!");
      console.log(response.data);
      navigate("/investor/dashboard");
    } catch (error) {
      if(error.response.status === 400){        
        setError(error.response.data);
      }
      setButtonIsDisabled(false);
      console.log(error);
    }
  }

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
            <button type="submit" disabled={buttonIsDisabled} onClick={handleSubmit}>Verify</button>
          </div>
        </div>
      }
    />
  );
};

export default Otp;
