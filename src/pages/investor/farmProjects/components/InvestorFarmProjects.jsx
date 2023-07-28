import React, { useState, useEffect } from 'react';
import InvestorTopLeftNav from '../../../investor/utils/InvestorTopLeftNav';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/farmProjects.css';
import axios from '../../../../api/axios';
import defaultFarmProjectPicture from '../../../../assets/images/farmProject.jpg';

const InvestorFarmProjects = () => {
  const location = useLocation();
  const data = location.state;
  const [farmProjects, setFarmProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      if (data == null || data === undefined) {
        navigate("/login")
      }
    fetchFarmProjects();
  }, []);

  const fetchFarmProjects = async () => {
    try {
      const request = {
        headers: {
          Authorization: 'Bearer '.concat(data.access_token),
        },
      };
      const response = await axios.get('/farmProject/getAllFarmProjects', request);
      console.log(response.data);
      setFarmProjects(response.data);
    } catch (error) {
      let response = error.response.data;
      console.log(error);
      console.log(error.response.data);
    }
  };

  const viewProjectDetails = (index)=>{
    console.log(index);
    navigate("/investor/dashboard/projects/"+index, {state: {"farmProjects": farmProjects, "data": data}});
  }
  
  const getDate = (date)=>{
    const dateInString = new Date(date);
    const day = dateInString.getDate();
    const month = dateInString.getMonth();
    const year = dateInString.getFullYear();
    return day+"/"+month+"/"+year;
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
    <>
      <InvestorTopLeftNav
        data={data}
        navIndex={2}
        content={
          <div className="main-content">
            <h3 className="dash-board font-bold text-[#1B4332] text-4xl pl-10">Explore Farm Projects</h3><br />
            <p className="dash-board font-bold text-[#0b0c0b] text-2xl pl-10">Available Farm Projects</p>
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
    </>
  );
};

export default InvestorFarmProjects;
