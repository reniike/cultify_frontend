import { useState } from "react";
import React from "react";
import AdminTopLeftNavBar from "./adminTopLeftNavBar";

const AdminFarmProjects = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleImageUpload = (imageUrl) => {
    setUploadedImageUrl(imageUrl);
  };

  return (
    <AdminTopLeftNavBar
      content={
        <div className="pt-4 pr-10 bg-background-green/10 w-full">
          <div className="flex justify-between mt-3">
            <h1 className="ml-3 font-bold text-[20px] text-custom-green">
              Available Farm Projects{" "}
            </h1>
            <button className="bg-green-800 text-white text-[15px] w-30 p-1 rounded">
              Add farm projects
            </button>
          </div>

          <div className="product-details grid grid-cols-2 h-15 gap-x-14 ml p-8">
            <div className="project-one border-[2px]  border-custom-blue bg-white  rounded-xl h-96 .pl-20 font-bold text-black-600 text-lg pl-4">
              {uploadedImageUrl && (
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  className="h-full w-full"
                />
              )}
            </div>
            <div className="project-two border-[2px]  border-custom-blue bg-white  rounded-xl h-96 pl-22 font-bold text-black-600 text-lg pl-4"></div>
          </div>

          <div className="product-details grid grid-cols-2 h-15 gap-x-14 ml p-8">
            <div className="project-one border-[2px]  border-custom-blue bg-white  rounded-xl h-96 .pl-20 font-bold text-black-600 text-lg pl-4"></div>
            <div className="project-two border-[2px]  border-custom-blue bg-white  rounded-xl h-96 pl-22 font-bold text-black-600 text-lg pl-4"></div>
          </div>
        </div>
      }
    />
  );
};

export default AdminFarmProjects;
