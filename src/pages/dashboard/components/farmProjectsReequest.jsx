import React, { useState, useRef } from "react";
import AdminTopLeftNavBar from "./adminTopLeftNavBar";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

const FarmProjectsReequest = () => {
  const [imageUrl, setImageUrl] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("upload_preset", "cultify");

    axios
      .post("https://api.cloudinary.com/v1_1/sgreen/image/upload", formData)
      .then((response) => {
        console.log(response.data.url);
        const url = response.data.url;
        setImageUrl(url);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImage();
    const formData = new FormData(formRef.current);
    const farmProduceSummary = formData.get("summary");
    const description = formData.get("description");
    const startDate = formData.get("start_date");
    const maturityDate = formData.get("maturity_date");
    const pricePerUnit = formData.get("price_Per_Unit");
    const projectName = formData.get("project_Name");

    const data = {
      farmProduceSummary: farmProduceSummary,
      description: description,
      startDate: startDate,
      maturityDate: maturityDate,
      pricePerUnit: pricePerUnit,
      projectName: projectName,
      imageUrl: imageUrl,
    };

    try {
      const response = await axios.post("/farmProject/createFarmProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate("/admin/farmprojects");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <AdminTopLeftNavBar
      content={
        <div className=" grid grid-cols-1 ml-20 w-[700px] pt-20 pb-10">
          <div className="project-one border-[2px]  border-custom-blue bg-white  rounded-xl h-[585px] .pl-20 font-bold text-black-600 text-lg pl-4">
            <h3>Add project details</h3>
            <form ref={formRef} onSubmit={handleSubmit}>
              <label htmlFor="summary"> Farm produce summary</label>
              <input
                type="text"
                id="summary"
                required
                className="border border-custom-blue w-[550px] rounded"
              />

              <label htmlFor="description"> Description</label>
              <input
                type="text"
                id="description"
                required
                className="border border-custom-blue w-[550px] rounded"
              />
              <label htmlFor="start_date"> Start date</label>
              <input
                type="text"
                id="start_date"
                required
                className="border border-custom-blue w-[550px] rounded"
              />
              <label htmlFor="maturity_date"> Maturiry date</label>
              <input
                type="text"
                id="maturity_date"
                required
                className="border border-custom-blue w-[550px] rounded"
              />
              <label htmlFor="price_per_unit"> Price per unit</label>
              <input
                type="text"
                id="price_per_unit"
                required
                className="border border-custom-blue w-[550px] rounded"
              />
              <label htmlFor="project_name"> Project Name</label>
              <input
                type="text"
                id="Project_Name"
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
            </form>
          </div>
        </div>
      }
    />
  );
};

export default FarmProjectsReequest;
