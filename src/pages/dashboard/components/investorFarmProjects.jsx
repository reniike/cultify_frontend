import React, { useState, useEffect } from 'react';
import InvestorTopLeftNav from './investorTopLeftNav';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/farmProjects.css';
import axios from '../../../api/axios';
import defaultFarmProjectPicture from '../../../assets/images/farmProject.jpg';

const InvestorFarmProjects = () => {
  const location = useLocation();
  const data = location.state;
  const [farmProjects, setFarmProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <>
      <InvestorTopLeftNav
        data={data}
        content={
          <div className="main-content">
            <h3 className="dash-board font-bold text-[#1B4332] text-4xl pl-10">Explore Farm Projects</h3>
            <div className="product-details grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-8">
              {farmProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`project-card border-[2px] border-custom-blue bg-white rounded-xl font-bold text-black-600 text-lg p-4 flex`}
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
                    <div className="project-name">{project.farmProduceSummary}</div>
                    <div className="project-location">Location: {project.location}</div>
                    <div className="project-startDate">From: {project.investmentPlan.startDate}</div>
                    <div className="project-maturityDate">To: {project.investmentPlan.maturityDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />
    </>
  );
};

export default InvestorFarmProjects;
