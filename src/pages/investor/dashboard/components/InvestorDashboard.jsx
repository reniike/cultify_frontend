import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InvestorTopLeftNav from "../../utils/InvestorTopLeftNav";
import { useNavigate } from "react-router-dom";
import axios from "../../../../api/axios";
import defaultFarmProjectPicture from "../../../../assets/images/farmProject.jpg";
import { setDataInStorage, getDataFromStorage } from "../../../utils/app/Storage";

const InvestorDashboard = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  console.log(data);
  let email = "";
  const [farmProjects, setFarmProjects] = useState(()=>{
    const obj = getDataFromStorage(data?.user?.id+"farmProjects");
    return obj != null ? obj: []
  }); 
  const [statistics, setStatistics] = useState(()=>{
    const obj = getDataFromStorage(data?.user?.id+"statistics");
    return obj != null ? obj: {}
  });

  useEffect(() => {
    if (data == null || data === undefined) {
      navigate("/login");
    } else {
      email = data.user.userResponse.emailAddress;
      fetchStatistics();
    }
  }, []);


  useEffect(() => {
    fetchFarmProjects();
  }, []);

  const fetchFarmProjects = async () => {
    try {
      const request = {
        headers: {
          Authorization: "Bearer " + data.access_token,
        },
      };
      const response = await axios.get(
        "/farmProject/getAllFarmProjects",
        request
      );
      console.log(response.data);
      setDataInStorage(data.user.id+"farmProjects", response.data)
      setFarmProjects(response.data);
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const request = {
        headers: {
          Authorization: "Bearer ".concat(data.access_token),
        },
      };
      const response = await axios.get(
        "/getInvestorDashboardStatistics/".concat(email),
        request
      );
      console.log(response.data);
      setDataInStorage(data.user.id+"statistics", response.data)
      setStatistics(response.data);
    } catch (error) {
      let response = error.response;
      console.log(error);
      console.log(response);
      if (error.response.status === 403) {
        navigate("/login");
      }
    }
  };

  const viewAllProjects = () => {
    navigate("/investor/dashboard/projects", { state: data });
  };

  const viewProjectDetails = (index) => {
    console.log(index);
    navigate("/investor/dashboard/projects/" + index, {
      state: { farmProjects: farmProjects, data: data },
    });
  };

  const getDate = (date) => {
    const dateInString = new Date(date);
    const day = dateInString.getDate();
    const month = dateInString.getMonth();
    const year = dateInString.getFullYear();
    return day + "/" + month + "/" + year;
  };

  return (
    <InvestorTopLeftNav
      data={data}
      navIndex={0}
      content={
        <div className="right-nav pt-4 pr-10 bg-background-green/10 top-15 right-20">
          <h3 className="dash-board font-bold text-[#1B4332] text-4xl pl-10">
            Investor Dashboard
          </h3>
          <div className="upper-boxes">
            <h3 className="welcome font-bold text-black-500 text-2xl pl-10 pt-6">
              {" "}
              Welcome, {data?.user?.userResponse.firstName}
            </h3>
            <div className="investors-details grid grid-cols-3 h-13 gap-x-20 mr-6 p-6">
              <div className="number border-[2px] shadow-lg bg-[#e6f2e3] w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3 hover:shadow-xl transition duration-100 ease-in-out">
                <h3 className="text-[#000000]">
                  Total Number of
                  <br /> Investments
                </h3>
                <p className="mt-[18%] mr-[7%] text-[30px] text-right text-[#000000]">
                  {statistics.totalNumberOfInvestments}
                </p>
              </div>
              <div className="number border-[2px] shadow-lg bg-[#e6f2e3] w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3 hover:shadow-xl transition duration-100 ease-in-out">
                <h3 className="text-[#000000]">
                  Total Amount <br />
                  Invested
                </h3>
                <p className="mt-[18%] mr-[7%] text-[30px] text-right text-[#000000]">
                  #{statistics.totalAmountInvested}
                </p>
              </div>
              <div className="number border-[2px] shadow-lg bg-[#e6f2e3] w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3 hover:shadow-xl transition duration-100 ease-in-out">
                <h3 className="text-[#000000]">
                  Upcoming <br />
                  Payments
                </h3>
                <p className="mt-[18%] ml-[15px] text-right text-[25px] text-[#000000] w-[90%] ">
                  {statistics.upcomingPaymentDate}
                </p>
              </div>
            </div>
          </div>
          <h3 className="project font-bold text-black-600 text-2xl pl-10 pt-6">
            Farm Projects
          </h3>
          <div className="product-details grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-8">
            {farmProjects.slice(0, 2).map((project, index) => (
              <div
                key={project.id}
                className={`project-card border-[2px] border-custom-blue bg-white rounded-xl font-bold text-black-600 text-lg p-4 flex`}
                onClick={() => viewProjectDetails(index)}
              >
                <div className="project-picture w-1/2 h-full mr-4">
                  <img
                    src={
                      project.picture
                        ? project.picture
                        : defaultFarmProjectPicture
                    }
                    alt={project.farmProduceSummary}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="project-details w-1/2">
                  <h3 className="text-xl font-bold mb-4">
                    {String(project.farmProduceSummary).toUpperCase()}
                  </h3>
                  <div className="mb-2 text-xl">Status: {project.status}</div>
                  <div className="mb-2 text-xl">
                    Location: {project.location}
                  </div>
                  <div className="mb-2 text-xl">
                    Unit price: #{project.investmentPlan.amountPerUnit}
                  </div>
                  <div className="mb-2 text-xl">
                    ROI: {project.investmentPlan.roi}%
                  </div>
                  <div className="mb-2 text-xl">
                    From: {getDate(project.investmentPlan.startDate)}
                  </div>
                  <div className="mb-4 text-xl">
                    To: {getDate(project.investmentPlan.maturityDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="mt-[2%] ml-[15px] text-[25px] text-custom-blue w-[90%] cursor-pointer">
              <span onClick={viewAllProjects} className="underline">
                View all
              </span>
            </p>
          </div>
        </div>
      }
    />
  );
};

export default InvestorDashboard;
