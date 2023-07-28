import React, { useState, useRef, useEffect } from "react";
import AdminTopLeftNavBar from "../../../admin/components/adminTopLeftNavBar/components/AdminTopLeftNavBar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "../../../../api/axios";
import { useLocation } from "react-router-dom";

const FarmersRegistration = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const data = useLocation().state;
  const admin = data.data;
  const leftBar = data.leftBar;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data == null || data === undefined) {
      navigate("/login");
    }
  }, []);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("upload_preset", "cultify");

    axios
      .post("https://api.cloudinary.com/v1_1/sgreen/image/upload", formData)
      .then((response) => {
        console.log(response.data.url);
        registerFarmer(response.data.url);
      });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (validateInputs()) {
      uploadImage();
    } else setIsLoading(false);
  };

  const registerFarmer = async (imageUrl) => {
    const data = {
      firstName: firstname,
      lastName: lastname,
      description: description,
      location: location,
      profilePicture: imageUrl,
      specialization: specialization,
    };

    console.log(data);
    try {
      const response = await axios.post("/farmer/registerFarmer", data, {
        headers: {
          Authorization: "Bearer " + admin.access_token,
        },
      });

      if (response.status == 201) {
        console.log(response);
        navigate("/admin/dashboard/farmers", {
          state: { leftBar: leftBar, data: admin },
        });
      } else {
        console.log("failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    const errors = {};

    if (!firstname) {
      errors.firstname = "First Name is required.";
    }

    if (!lastname) {
      errors.lastname = "Last Name is required.";
    }

    if (!description) {
      errors.description = "Description is required.";
    }

    if (!location) {
      errors.location = "Location is required.";
    }
    if (!imageUrl) {
      errors.imageUrl = "Please select a picture of the farmer.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <AdminTopLeftNavBar
    navIndex={4}
      data={admin}
      leftBar={leftBar}
      content={
        <div className="grid grid-cols-1 ml-[20%] w-[700px] h-auto pt-10 pb-10">
          <div className="border-2 border-green-500 bg-white rounded-xl p-6 font-medium text-gray-700">
            <h3 className="text-xl font-bold mb-4">ADD A FARMER</h3>
            <div className="space-y-4">
              <label htmlFor="firstname" className="text-lg font-medium">
                {" "}
                First Name
              </label>
              <input
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    firstname: "",
                  }));
                  setFirstName(e.target.value);
                }}
                type="text"
                id="firstname"
                required
                className="border border-green-500 rounded w-[550px]"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">{errors.firstname}</p>
              )}

              <label htmlFor="lastname" className="text-lg font-medium">
                {" "}
                Last Name
              </label>
              <input
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    lastname: "",
                  }));
                  setLastName(e.target.value);
                }}
                type="text"
                id="lastname"
                required
                className="border border-green-500 rounded w-[550px]"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">{errors.firstname}</p>
              )}

              <label htmlFor="location" className="text-lg font-medium">
                {" "}
                Location
              </label>
              <input
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    location: "",
                  }));
                  setLocation(e.target.value);
                }}
                type="text"
                id="location"
                required
                className="border border-green-500 rounded w-[550px]"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}

              <label htmlFor="location" className="text-lg font-medium">
                {" "}
                Specialization
              </label>
              <input
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    location: "",
                  }));
                  setSpecialization(e.target.value);
                }}
                type="text"
                id="location"
                required
                className="border border-green-500 rounded w-[550px]"
              />
              {errors.specialization && (
                <p className="text-red-500 text-sm">{errors.specialization}</p>
              )}

              <label htmlFor="description" className="text-lg font-medium">
                {" "}
                Description
              </label>
              <textarea
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    description: "",
                  }));
                  setDescription(e.target.value);
                  const textarea = e.target;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                }}
                value={description}
                id="description"
                required
                className="border border-green-500 rounded resize-none w-full overflow-hidden py-2 px-3 text-base text-gray-700 leading-normal"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}

              <label htmlFor="" className="text-lg font-medium">
                {" "}
                Upload a picture depicting the farmer's specialization{" "}
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    imageUrl: "",
                  }));
                  setImageUrl(e.target.files[0]);
                }}
                className="mb-4"
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm">{errors.imageUrl}</p>
              )}

              <br />
              <button
                type="submit"
                className={`btn-submit ml-[60%] w-40 ${
                  isLoading
                    ? "loading"
                    : "bg-green-800 text-white text-[15px] w-50 p-1 rounded ml-[500px]"
                }`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading-indicator"></div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default FarmersRegistration;
