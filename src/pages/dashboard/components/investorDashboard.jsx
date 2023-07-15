import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InvestorTopLeftNav from "./investorTopLeftNav";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import defaultFarmProjectPicture from '../../../assets/images/farmProject.jpg';

const InvestorDashboard = () => {
  const [farmProjects, setFarmProjects] = useState([]);
  const [statistics, setStatistics] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  let email = "";
  
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
  
  useEffect(() => {
    if (data == null || data === undefined) {
      navigate("/login")
    }else{
      email = data.user.userResponse.emailAddress;
      fetchStatistics();
    }
  }, []);

  const fetchStatistics = async ()=>{    
    try {
      const request = {
        headers: {
          Authorization: "Bearer ".concat(data.access_token),
        }
      }
      const response = await axios.get("/investment/getDashboardStatistics/".concat(email), request);
      console.log(response.data);
      setStatistics(response.data);
    } catch (error) {
      let response = error.response;
      console.log(error);
      console.log(response);
      if (error.response.status === 403) {
        navigate("/login")
      }
    }
  }

  const viewAllProjects = ()=>{    
    navigate('/investor/dashboard/projects', { state: data });
  }
  
  const viewProjectDetails = (index)=>{
    console.log(index);
    navigate("/investor/dashboard/projects/"+index, {state: {"farmProjects": farmProjects, "data": data}});
  }

  return (
    <InvestorTopLeftNav data={data} content={
      <div className="right-nav pt-4 pr-10 bg-background-green/10 top-15 right-20">
                    <h3 className="dash-board font-bold text-[#1B4332] text-4xl pl-10">Investor Dashboard</h3>
            <div className="upper-boxes">
                    <h3 className="welcome font-bold text-black-500 text-2xl pl-10 pt-6" > Welcome, {data?.user?.userResponse.firstName}</h3>
                <div className="investors-details grid grid-cols-3 h-13 gap-x-20 mr-6 p-6">
                      <div className="number border-[2px] border-custom-green bg-white w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3">
                        <h3 className="text-custom-blue">Total Number of<br/> Investments</h3>
                        <p className="mt-[18%] mr-[7%] text-[30px] text-right text-custom-blue">{statistics.totalNumberOfInvestments}</p>
                      </div>
                      <div className="number border-[2px] border-custom-green bg-white w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3">
                        <h3 className="text-custom-blue">Total Amount <br/>Invested</h3>
                        <p className="mt-[18%] mr-[7%] text-[30px] text-right text-custom-blue">{statistics.totalAmountInvested}</p>
                      </div>
                      <div className="number border-[2px] border-custom-green bg-white w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3">
                        <h3 className="text-custom-blue">Upcoming <br/>Payments</h3>
                        <p className="mt-[18%] ml-[15px] text-right text-[25px] text-custom-blue w-[90%] ">{statistics.upcomingPaymentDate}</p>
                      </div>
                </div>
            </div>
            <h3 className="project font-bold text-black-600 text-2xl pl-10 pt-6">Farm Projects</h3>
        <div className="product-details grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-8">
          {farmProjects.slice(0, 2).map((project, index) => (
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
        <div className="text-right">
          <p className="mt-[2%] ml-[15px] text-[25px] text-custom-blue w-[90%] cursor-pointer">
            <span onClick={viewAllProjects} className="underline">View all</span>
          </p>
        </div>
        </div>
    }/>
  );
};

export default InvestorDashboard;
