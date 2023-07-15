import React from "react";
import { useParams, useLocation } from "react-router-dom";
import InvestorTopLeftNav from "./investorTopLeftNav";
import defaultFarmProjectPicture from "../../../assets/images/farmProject.jpg";

const FarmProjectDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const farmProjects = location.state.farmProjects;
  const data = location.state.data;
  const project = farmProjects[id];

  return (
    <>
      <InvestorTopLeftNav 
        data={data}
        content={          
          <div className="flex justify-center items-center mt-8">
          <div className="max-w-4xl w-full rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-80">
                <img
                  src={project.picture ? project.picture : defaultFarmProjectPicture}
                  alt={project.farmProduceSummary}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-4">{project.farmProduceSummary}</h3>
                <div className="mb-2 text-xl">Location: {project.location}</div>
                <div className="mb-2 text-xl">From: {project.investmentPlan.startDate}</div>
                <div className="mb-4 text-xl">To: {project.investmentPlan.maturityDate}</div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Invest Now</button>
              </div>
            </div>
            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">Project Description:</h4>
              <p>{project.description}</p>
            </div>
          </div>
        </div>
        }/>
    </>
  );
};

export default FarmProjectDetails;
