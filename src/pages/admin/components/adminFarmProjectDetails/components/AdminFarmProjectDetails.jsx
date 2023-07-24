import { React, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AdminTopLeftNavBar from "../../adminTopLeftNavBar/components/AdminTopLeftNavBar";
import defaultFarmProjectPicture from "../../../../../assets/images/farmProject.jpg";
import axios from "../../../../../api/axios";

const AdminFarmProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;
  const farmProjects = data.farmProjects;
  const admin = data.data;
  const leftBar = data.leftBar;
  const project = farmProjects[id];
  console.log(admin);
  console.log(leftBar);

  const getDate = (date) => {
    const dateInString = new Date(date);
    const day = dateInString.getDate();
    const month = dateInString.getMonth();
    const year = dateInString.getFullYear();
    return day + "/" + month + "/" + year;
  }

  useEffect(() => {
    if (admin == null || admin === undefined) {
      navigate("/login")
    }
  }, []);

  return (
    <>
      <AdminTopLeftNavBar
        leftBar={leftBar}
        data={admin}
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
                  <h3 className="text-3xl font-bold mb-4">{String(project.farmProduceSummary).toUpperCase()}</h3>
                  <div className="mb-2 text-xl">Status: {project.status}</div>
                  <div className="mb-2 text-xl">Location: {project.location}</div>
                  <div className="mb-2 text-xl">Unit price: #{project.investmentPlan.amountPerUnit}</div>
                  <div className="mb-2 text-xl">ROI: {project.investmentPlan.roi}%</div>
                  <div className="mb-2 text-xl">From: {getDate(project.investmentPlan.startDate)}</div>
                  <div className="mb-4 text-xl">To: {getDate(project.investmentPlan.maturityDate)}</div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Project Description:</h4>
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default AdminFarmProjectDetails;
