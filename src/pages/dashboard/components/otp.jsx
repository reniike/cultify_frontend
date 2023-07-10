import React, { useState } from "react";
import "../styles/otp.css";
import CultifyTopNav from "../../dashboard/components/cultifyTopNav";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

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
    setOtp("");
  };

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
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Verify</button>
          </form>
        </div>
      }
    />
  );
};

export default Otp;
