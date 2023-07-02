import React, { useState } from "react";
import "../styles/userRegistration.css";

const TransporterRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [businessDocument, setBusinessDocument] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!name) {
      formErrors.name = "Name is required";
    }
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      formErrors.email = "Invalid email address";
    }
    if (!phone) {
      formErrors.phone = "Phone number is required";
    } else if (!isValidPhoneNumber(phone)) {
      formErrors.phone = "Invalid phone number";
    }
    if (!password) {
      formErrors.password = "Password is required";
    } else if (!isValidPassword(password)) {
      formErrors.password =
        "Password must be 8-24 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (!confirmPassword) {
      formErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }
    if (!address) {
      formErrors.address = "Address is required";
    }
    if (!businessDocument) {
      formErrors.farmlandDocument = "Farmland document is required";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Form is valid, proceed with submission or further processing
      // ...
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    return passwordRegex.test(password);
  };

  const handleBusinessDocumentChange = (e) => {
    setBusinessDocument(e.target.files[0]);
  };

  return (
    <div className="container">
      <h1>Transporter Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="first-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "input-error" : ""}
          />
          <p className="error">{errors.name}</p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "input-error" : ""}
          />
          <p className="error">{errors.email}</p>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={errors.phone ? "input-error" : ""}
          />
          <p className="error">{errors.phone}</p>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "input-error" : ""}
          />
          <p className="error">{errors.password}</p>
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? "input-error" : ""}
          />
            <p className="error">{errors.confirmPassword}</p>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={errors.address ? "input-error" : ""}
          />
          <p className="error">{errors.address}</p>
        </div>

        <div className="form-group">
          <label htmlFor="farmland-document">Business Document:</label>
          <input
            type="file"
            id="farmland-document"
            onChange={handleBusinessDocumentChange}
            className={errors.farmlandDocument ? "input-error" : ""}
          />
            <p className="error">{errors.farmlandDocument}</p>
        </div>
        <button type="submit" className="btn-submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default TransporterRegistration;
