import cultifyLogo from "../../../assets/logo.svg";
import dropDown from "../assets/dropDownIcon.svg";
import React, { useState } from "react";
import DefaultProfilePicture from "../../../assets/images/defaultProfilePicture.svg";
import PenIcon from "../../../assets/images/penIcon.svg";
import CameraIcon from "../../../assets/images/cameraIcon.svg";
import { useNavigate } from "react-router-dom";
import "../styles/topNav.css";

const TopLeftNavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [firstName, setFirstName] = useState("investor");
  const [lastName, setLastName] = useState("investorrrrr");
  const [email, setEmail] = useState("example@example.com");
  const [contact, setContact] = useState("09054442324");
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(DefaultProfilePicture);
  const [showCameraIcon, setShowCameraIcon] = useState(false);

  const navigate = useNavigate();

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please choose an image file.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please drop an image file.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveChanges = () => {
    setEditMode(false);
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  const handleContactChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setContact(value);
  };

  const isContactValid = /^(\d{11})?$/.test(contact);


  return (
    <nav className="top-nav-container fixed top-0 left-0 w-full z-50">
      <div className="top-nav bg-white shadow-md p-2 md:p-5 mx-auto h-14 flex justify-between items-center">
        <img
          src={cultifyLogo}
          className="logo h-10 w-30 cursor-pointer"
          alt="Logo"
          onClick={() => {
            navigate("/home");
          }}
        />
        <div className="w-[5%] h-[6%] pb-8">
          <img
            src={dropDown}
            className="drop cursor-pointer"
            alt="drop down"
            onClick={toggleDropdown}
          />
        </div>
      </div>
      {showDropdown && (
        <div className="w-[20%] h-20 ml-[77%] mt-[-4px]">
          <ul className="bg-white border-4 text-center border-custom-green mt-2 p-2 rounded-lg ">
            <li className="flex justify-center items-center mt-4 relative">
              <div
                className="w-12 h-12 bg-custom-green border-4 border-solid border-custom-green rounded-full overflow-hidden cursor-pointer"
                onClick={() => document.getElementById("profilePictureInput").click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onMouseEnter={() => setShowCameraIcon(true)}
                onMouseLeave={() => setShowCameraIcon(false)}
              >
                {showCameraIcon && (
                  <img
                    src={CameraIcon}
                    alt="Camera"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4"
                  />
                )}
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <input
                id="profilePictureInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
              {editMode && (
                <img
                  src={PenIcon}
                  alt="Edit"
                  className="absolute top-0 right-0 w-4 h-4 cursor-pointer"
                  onClick={handleEditClick}
                />
              )}
            </li>
            <li>
              <div>
                <div className="mt-4">
                  {editMode ? (
                    "First name:"
                  ) : (
                    <>First name: {firstName} <br /></>

                  )}
                </div>
                {editMode && (
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-custom-green border-[3px] bg-white rounded"
                  />
                )}
              </div>
            </li>
            <li>
              {editMode ? (
                <>
                  <div>Last name:</div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-custom-green border-[3px] bg-white rounded px-2 py-1 w-48"
                  />
                </>
              ) : (
                <div>{`Last name: ${lastName}`}</div>
              )}
            </li>
            <li>
              <div className="text-lg mt-4">
                {editMode ? (
                  <>
                    <p className='text-center'>Email:</p>
                    <div className="mb-1 ml-14 border-custom-green border-[3px] w-[65%] justify-center items-center rounded-md px-2 py-1"> example@example.com</div>
                  </>) : (
                  <div className=''>Email: example@example.com</div>
                )}
              </div>
            </li>
            <li>
              {editMode ? (
                <>
                  <div>Contact:</div>
                  <input
                    type="tel"
                    value={contact}
                    onChange={handleContactChange}
                    className={`border-custom-green border-[3px] bg-white rounded px-2 py-1 w-48 ${!isContactValid ? "border-red-500" : ""
                      }`}
                  />
                </>
              ) : (
                <div>{`Contact: ${contact}`}</div>
              )}
            </li>
            <li>
              {editMode ? (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mt-3"
                  onClick={handleSaveChanges}
                  disabled={!isContactValid}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-custom-blue text-white px-4 py-2 rounded mt-3"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
            </li>
            <br />
            <li>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default TopLeftNavBar;
