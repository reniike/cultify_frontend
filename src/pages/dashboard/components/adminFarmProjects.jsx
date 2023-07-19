import { useState, useEffect } from "react";
import React from "react";
import AdminTopLeftNavBar from "./adminTopLeftNavBar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import defaultFarmProjectPicture from '../../../assets/images/farmProject.jpg';


const AdminFarmProjects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const admin = data.data;
  const leftBar = data.leftBar;
  console.log("leftbar", leftBar);
  const [farmProjects, setFarmProjects] = useState([]);

  useEffect(()=>{
    fetchFarmProjects();
  }, []);

  const fetchFarmProjects = async ()=>{
    const url = '/farmProject/getAllFarmProjects';
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: 'Bearer '+admin.access_token,
        },
      })
      if (response.status == 200) {
        console.log(response);
        setFarmProjects(response.data);
      }
      else{
        console.log(response);
      }
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/login")
      }
      console.log(error);
    }
  }
  
  const getDate = (date)=>{
    const dateInString = new Date(date);
    const day = dateInString.getDate();
    const month = dateInString.getMonth();
    const year = dateInString.getFullYear();
    return day+"/"+month+"/"+year;
  }
  
  const viewProjectDetails = (index)=>{
    console.log(index);
    navigate("/admin/dashboard/projects/"+index, {state: {"leftBar": leftBar, "farmProjects": farmProjects, "data": admin}});
  }
  
  const projectBox = (project, index)=>(
    <div
    key={project.id}
    className='project-card border-[2px] border-custom-blue bg-white rounded-xl font-bold text-black-600 text-lg p-4 flex'
    onClick={()=>viewProjectDetails(index)}
  >
    <div className="project-picture w-1/2 h-full mr-4">
      <img
        src={project.picture ? project.picture : defaultFarmProjectPicture}
        alt={project.farmProduceSummary}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="project-details w-1/2">
      <div className="project-name">{String(project.farmProduceSummary).toUpperCase()}</div>
      <div className="project-name">Status: {project.status}</div>
      <div className="project-location">Location: {project.location}</div>
      <div className="project-startDate">Unit price: #{project.investmentPlan.amountPerUnit}</div>
      <div className="project-startDate">ROI: {project.investmentPlan.roi}%</div>
      <div className="project-startDate">From: {getDate(project.investmentPlan.startDate)}</div>
      <div className="project-maturityDate">To: {getDate(project.investmentPlan.maturityDate)}</div>
    </div>
  </div>
)

  return (
    <AdminTopLeftNavBar
      data={admin}
      leftBar={leftBar}
      content={
        <div className="pt-4 pr-10 bg-background-green/10 w-full">
          <div className="flex justify-between mt-3">
            <h1 className="ml-3 font-bold text-[20px] text-custom-green">
              Available Farm Projects{" "}
            </h1>
            <button
              onClick={()=>{navigate("/farmProjectCreation", {state: {"leftBar": leftBar, "farmProjects": farmProjects, "data": admin}})}}
              className="bg-green-800 text-white text-[15px] w-30 p-1 rounded"
            >
              Add farm projects
            </button>
          </div>

          <div className="product-details grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-8">
          {farmProjects.map((project, index) => {
                if(project.status === "AVAILABLE"){
                  return projectBox(project, index);
                }
                })}
            </div><p className="dash-board font-bold text-[#0b0c0b] text-2xl pl-10">Closed Projects</p>
            <div className="product-details grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-8">
              {farmProjects.map((project, index) => {
                if(project.status === "CLOSED"){
                  return projectBox(project, index);
                }
                })}
          </div>
        </div>
      }
    />
  );
};

export default AdminFarmProjects;
