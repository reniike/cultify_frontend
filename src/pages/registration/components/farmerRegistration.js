import React, { useState } from "react";
import "../styles/userRegistration.css";

const FarmerRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [farmlandDocument, setFarmlandDocument] = useState(null);
  const [farmlandPicture, setFarmlandPicture] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    const formErrors = {};
    if (!firstName) {
      formErrors.firstName = "First name is required";
    }
    if (!lastName) {
      formErrors.lastName = "Last name is required";
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
    if (!farmlandDocument) {
      formErrors.farmlandDocument = "Farmland document is required";
    }
    if (!farmlandPicture) {
      formErrors.farmlandPicture = "Farmland picture is required";
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

  const handleFarmlandDocumentChange = (e) => {
    setFarmlandDocument(e.target.files[0]);
  };

  const handleFarmlandPictureChange = (e) => {
    setFarmlandPicture(e.target.files[0]);
  };

  return (
    <div className="container">
      <h1>Farmer Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={errors.firstName ? "input-error" : ""}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={errors.lastName ? "input-error" : ""}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
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
          {errors.email && <p className="error">{errors.email}</p>}
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
          {errors.phone && <p className="error">{errors.phone}</p>}
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
          {errors.password && <p className="error">{errors.password}</p>}
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
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={errors.address ? "input-error" : ""}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="farmland-document">Farmland Document:</label>
          <input
            type="file"
            id="farmland-document"
            onChange={handleFarmlandDocumentChange}
            className={errors.farmlandDocument ? "input-error" : ""}
          />
          {errors.farmlandDocument && (
            <p className="error">{errors.farmlandDocument}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="farmland-picture">Farmland Picture:</label>
          <input
            type="file"
            id="farmland-picture"
            onChange={handleFarmlandPictureChange}
            className={errors.farmlandPicture ? "input-error" : ""}
          />
          {errors.farmlandPicture && (
            <p className="error">{errors.farmlandPicture}</p>
          )}
        </div>
        <button type="submit" className="btn-submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default FarmerRegistration;
