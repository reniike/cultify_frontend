import React, { useState } from "react";
import "../styles/registrationPage.css";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import CultifyTopNav from "../../dashboard/components/cultifyTopNav";

const InvestorRegistrationPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!firstName) {
      formErrors.firstName = "*First name is required";
    }
    if (!lastName) {
      formErrors.lastName = "*Last name is required";
    }
    if (!email) {
      formErrors.email = "*Email is required";
    } else if (!isValidEmail(email)) {
      formErrors.email = "*Invalid email address i.e example@gmail.com";
    }
    if (!phone) {
      formErrors.phone = "*Phone number is required";
    } else if (!isValidPhoneNumber(phone)) {
      formErrors.phone = "*Invalid phone number";
    }
    if (!password) {
      formErrors.password = "*Password is required";
    } else if (!isValidPassword(password)) {
      formErrors.password =
        "*Password must be 8-24 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (!confirmPassword) {
      formErrors.confirmPassword = "*Confirm password is required";
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = "*Passwords do not match";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setButtonIsDisabled(true);
      registerInvestor();
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    return passwordRegex.test(password);
  };

  const registerInvestor = async () => {
    const request = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      phoneNumber: phone,
      password: password,
    };
    try {
      const response = await axios.post("/investor/registration", request);
      alert("Registration successful!");
      console.log(response.data);
      navigate("/otp");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CultifyTopNav
      content={
        <div className="registrationPageContainer">
          <div className="sign-in">
            <div>
              <p>
                Welcome to <span>Cultify</span>
              </p>
              <h1 className="b">Sign up</h1>
            </div>
            <div className="account">
              <p>No account ?</p>
              <>
                <span>Sign in</span>
              </>
            </div>
          </div>

          <div>
            <div className="userName  ">
              <div>
                <label htmlFor="first-name">First Name:</label>
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`userName-input1  ${
                    errors.firstName ? "input-error " : ""
                  }`}
                />
                <p className="error">{errors.firstName}</p>
              </div>

              <div>
                <label htmlFor="last-name">Last Name:</label>
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                  className={`userName-input2 ${
                    errors.lastName ? "input-error " : ""
                  }`}
                />
                <p className="error">{errors.lastName}</p>
              </div>
            </div>

            <div>
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="number"
                id="phone"
                value={phone}
                placeholder="Phone number"
                onChange={(e) => setPhone(e.target.value)}
                className={` number ${errors.phone ? "input-error" : ""}`}
              />

              <p className="error">{errors.phone}</p>
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => {
                  localStorage.setItem("email", e.target.value)
                  setEmail(e.target.value)
                }}
                className={`email mb-0 ${errors.email ? "input-error" : ""}`}
              />
              <p className="error">{errors.email}</p>
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className={` password mb-0 ${
                  errors.password ? "input-error" : ""
                }`}
              />
              <p className="error">{errors.password}</p>
            </div>

            <div>
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                placeholder="Comfirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`password ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
              />
              <p className="error">{errors.confirmPassword}</p>
            </div>

            <button type="submit" className="btn-submit" disabled={buttonIsDisabled} onClick={handleSubmit}>
              Register
            </button>
          </div>
        </div>
      }
    />
  );
};

export default InvestorRegistrationPage;
