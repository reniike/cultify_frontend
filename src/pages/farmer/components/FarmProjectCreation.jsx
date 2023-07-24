import React, { useState, useRef, useEffect } from "react";
import AdminTopLeftNavBar from "../../admin/components/adminTopLeftNavBar/components/AdminTopLeftNavBar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { useLocation } from "react-router-dom";
import '../styles/submitButton.css';

const FarmProjectCreation = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [farmProduceSummary, setFarmProduceSummary] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState({});
  const [maturityDate, setMaturityDate] = useState({});
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [roi, setRoi] = useState(0);
  const [maximumUnit, setMaximumUnit] = useState(0);
  const [location, setLocation] = useState("");
  const data = useLocation().state;
  const admin = data.data;
  const leftBar = data.leftBar;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    if (data == null || data === undefined) {
      navigate("/login")
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
        createFarmProject(response.data.url);
      });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (validateInputs() && validateDatesDifference()) {   
      uploadImage(); 
    }else setIsLoading(false)
  };

  const createFarmProject = async (imageUrl) => {
    const data = {
      farmProduceSummary: farmProduceSummary,
      description: description,
      startDate: startDate,
      maturityDate: maturityDate,
      amountPerUnit: pricePerUnit,
      maximumNumberOfUnit: maximumUnit,
      roi: roi,
      picture: imageUrl,
      location: location,
    };

    console.log(data);
    try {
      const response = await axios.post(
        "/farmProject/createFarmProject",
        data,
        {
          headers: {
            Authorization: "Bearer " + admin.access_token,
          },
        }
      );

      if (response.status == 200) {
        console.log(response);
        navigate("/admin/dashboard/projects", {state: {"leftBar": leftBar, "data": admin}});
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
  
    if (!farmProduceSummary) {
      errors.farmProduceSummary = "Farm produce summary is required.";
    }
  
    if (!description) {
      errors.description = "Description is required.";
    }
  
    if (!location) {
      errors.location = "Location is required.";
    }
  
    if (!startDate) {
      errors.startDate = "Start date is required.";
    }
  
    if (!maturityDate) {
      errors.maturityDate = "Maturity date is required.";
    }
  
    if (!pricePerUnit) {
      errors.pricePerUnit = "Price per unit is required.";
    }

    if (pricePerUnit < 5000) {
      errors.pricePerUnit = "Minimum price per unit must be #5,000.";      
    }
  
    if (roi <= 0) {
      errors.roi = "ROI must be greater than 0.";
    }
  
    if (maximumUnit <= 0) {
      errors.maximumUnit = "Maximum Number of Unit must be greater than 0.";
    }
    if (!imageUrl) {
      errors.imageUrl = "Please select an image for the farm project.";
    }
  
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateDatesDifference = ()=>{
    var startDateInSeconds = Date.parse(startDate);
    var maturityDateInSeconds = Date.parse(maturityDate);
    var dateDifference = maturityDateInSeconds - startDateInSeconds;
    var dateDifferenceInMonth = ((((dateDifference/60)/60)/24)/30)/1000;
    var currentDateInSeconds = Date.now();
    if ((currentDateInSeconds - startDateInSeconds) > 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        startDate: "Project start date must not be lesser than or equals to the current date"
      }));
      return false;
    }else{
      setErrors((prevErrors) => ({
        ...prevErrors,
        startDate: ""
      }));
    }
    if (dateDifferenceInMonth < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        maturityDate: "Project duration must not be less than 3 months"
      }));
      return false;
    }else{
      setErrors((prevErrors) => ({
        ...prevErrors,
        maturityDate: ""
      }));
    }
    return true;
  }

  useEffect(()=>{
    validateDatesDifference();
  }, [startDate, maturityDate])
  

  return (
    <AdminTopLeftNavBar
      data={admin}
      leftBar={leftBar}
      content={
        <div className="grid grid-cols-1 ml-[20%] w-[700px] h-auto pt-10 pb-10">
        <div className="border-2 border-green-500 bg-white rounded-xl p-6 font-medium text-gray-700">
            <h3 className="text-xl font-bold mb-4">ADD PROJECT DETAILS</h3>
            <div className="space-y-4">
              <label htmlFor="summary" className="text-lg font-medium"> Farm produce summary</label>
              <input
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    farmProduceSummary: "",
                  }));
                  setFarmProduceSummary(e.target.value);
                }}
                type="text"
                id="summary"
                required
                className="border border-green-500 rounded w-full py-2 px-3 text-base text-gray-700 leading-normal"
              />
              {errors.farmProduceSummary && <p className="text-red-500 text-sm">{errors.farmProduceSummary}</p>}

              <label htmlFor="description" className="text-lg font-medium"> Description</label>
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
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

              <label htmlFor="location" className="text-lg font-medium"> Location</label>
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
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}

              <label htmlFor="start_date" className="text-lg font-medium"> Start date</label>
              <input
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    startDate: "",
                  }));
                  validateDatesDifference();
                  setStartDate(e.target.value);
                }}
                type="date"
                id="start_date"
                required
                className="border border-green-500 rounded w-[550px]"
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}

              <label htmlFor="maturity_date" className="text-lg font-medium"> Maturity date</label>
              <input
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    maturityDate: "",
                  }));
                  setMaturityDate(e.target.value);
                }}
                type="date"
                id="maturity_date"
                required
                className="border border-green-500 rounded w-[550px]"
              />
              {errors.maturityDate && <p className="text-red-500 text-sm">{errors.maturityDate}</p>}

              <label htmlFor="price_per_unit" className="text-lg font-medium"> Price per unit</label>
              <input
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    pricePerUnit: "",
                  }));
                  setPricePerUnit(e.target.value);
                }}
                type="text"
                id="price_per_unit"
                required
                className="border border-green-500 rounded w-[550px]"
              />
              {errors.pricePerUnit && <p className="text-red-500 text-sm">{errors.pricePerUnit}</p>}

              <label htmlFor="roi" className="text-lg font-medium"> ROI</label>
              <input
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    roi: "",
                  }));
                  setRoi(e.target.value);
                }}
                type="number"
                id="Roi"
                required
                className="border border-green-500 rounded w-[550px] mb-4"
              />
              {errors.roi && <p className="text-red-500 text-sm">{errors.roi}</p>}

              <label htmlFor="maximum_unit" className="text-lg font-medium"> Maximum Number of Unit</label>
              <input
                onChange={(e) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    maximumUnit: "",
                  }));
                  setMaximumUnit(e.target.value);
                }}
                type="number"
                id="Maximum_Unit"
                required
                className="border border-green-500 rounded w-[550px] mb-4"
              />
              {errors.maximumUnit && <p className="text-red-500 text-sm">{errors.maximumUnit}</p>}

              <label htmlFor="" className="text-lg font-medium"> Upload farm picture</label>
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
              {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}

              <br />
              <button
                type="submit"
                className={`btn-submit ml-[60%] w-40 ${isLoading ? "loading" : "bg-green-800 text-white text-[15px] w-50 p-1 rounded ml-[500px]"}`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? <div className="loading-indicator"></div> : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default FarmProjectCreation;
