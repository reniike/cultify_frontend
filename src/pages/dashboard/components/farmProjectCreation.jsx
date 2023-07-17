import React, { useState, useRef, useEffect } from "react";
import AdminTopLeftNavBar from "./adminTopLeftNavBar";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { useLocation } from "react-router-dom";

const FarmProjectCreation = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [farmProduceSummary, setFarmProduceSummary] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [roi, setRoi] = useState(0);
  const [maximumUnit, setMaximumUnit] = useState(0);
  const [location, setLocation] = useState("");
  const admin = useLocation().state;

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("upload_preset", "cultify");

    await axios
      .post("https://api.cloudinary.com/v1_1/sgreen/image/upload", formData)
      .then((response) => {
        console.log(response.data.url);
        createFarmProject(response.data.url); 
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImage();   
  };

  const createFarmProject = async (imageUrl)=>{
    const data = {
      "farmProduceSummary": farmProduceSummary,
      "description": description,
      startDate: startDate,
      maturityDate: maturityDate,
      "amountPerUnit": pricePerUnit,
      "maximumNumberOfUnit": maximumUnit,
      "roi": roi,
      "picture": imageUrl,  
      "location": location,
    };

    console.log(data);
    try {
      const response = await axios.post("/farmProject/createFarmProject", data, {
        "headers": {
          "Authorization": 'Bearer '+admin.access_token,
        },
      });

      if (response.status == 200) {
        console.log(response)
        navigate("/admin/dashboard/projects", {state: admin});
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <AdminTopLeftNavBar
      content={
        <div className=" grid grid-cols-1 ml-20 w-[700px] h-20 pt-20 pb-10">
          <div className="project-one border-[2px]  border-custom-blue bg-white  rounded-xl h-[585px] .pl-20 font-bold text-black-600 text-lg pl-4">
            <h3>Add project details</h3>
            <div>
              <label htmlFor="summary"> Farm produce summary</label>
              <input
              onChange={(e)=>{setFarmProduceSummary(e.target.value)}}
                type="text"
                id="summary"
                required
                className="border border-custom-blue w-[550px] rounded"
              />

              <label htmlFor="description"> Description</label>
              <input
                onChange={(e)=>{setDescription(e.target.value)}}
                type="text"
                id="description"
                required
                className="border border-custom-blue w-[550px] rounded"
              />

              <label htmlFor="location"> Location</label>
              <input
                onChange={(e)=>{setLocation(e.target.value)}}
                type="text"
                id="location"
                required
                className="border border-custom-blue w-[550px] rounded"
              />
              <label htmlFor="start_date"> Start date</label>
              <input
                onChange={(e)=>{setStartDate(e.target.value)}}
                type="date"
                id="start_date"
                required
                className="border border-custom-blue w-[550px] rounded"
              />
              <label htmlFor="maturity_date"> Maturiry date</label>
              <input
                onChange={(e)=>{setMaturityDate(e.target.value)}}
                type="date"
                id="maturity_date"
                required
                className="border border-custom-blue w-[550px] rounded"
              />
              <label htmlFor="price_per_unit"> Price per unit</label>
              <input              
                onChange={(e)=>{setPricePerUnit(e.target.value)}}
                type="text"
                id="price_per_unit"
                required
                className="border border-custom-blue w-[550px] rounded"
              />
              <label htmlFor="roi"> ROI</label>
              <input              
                onChange={(e)=>{setRoi(e.target.value)}}
                type="number"
                id="Roi"
                required
                className="border border-custom-blue w-[550px] rounded mb-4"
              />
              <label htmlFor="maximum_unit"> Maximum Number of Unit</label>
              <input              
                onChange={(e)=>{setMaximumUnit(e.target.value)}}
                type="number"
                id="Maximum_Unit"
                required
                className="border border-custom-blue w-[550px] rounded mb-4"
              />

              <label htmlFor=""> upload farm picture</label>
              <input
                type="file"
                id="image"
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
                }}
                className="mb-4"
              />
              <br />
              <button
                onClick={handleSubmit}
                className="bg-green-800 text-white text-[15px] w-50 p-1 rounded ml-[500px]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default FarmProjectCreation;
