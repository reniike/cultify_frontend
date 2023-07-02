import React, { useState } from "react";
import '../styles/otp.css'

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
    <div className="container">
      <h1>OTP Verification</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
          />
        </div>
        <p className="error">{error}</p>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default Otp;
