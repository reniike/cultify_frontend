import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopNav from "./topNav";
import InvestorTopNavBar from "./investorTopNavBar";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

const InvestorDashboard = () => {
  const [farmProjects, setFarmProduce] = useState([]);
  const [statistics, setStatistics] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const email = data.user.userResponse.emailAddress;

  useEffect(() => {
    if (data == null || data === undefined) {
      navigate("/home")
    }
    fetchFarmProduce();
  }, [farmProjects]);

  const fetchFarmProduce = async () => {
    // const response = await fetch("/api/farm-produce");
    // const data = await response.json();
    // setFarmProduce(data);
  };
  
  useEffect(() => {
    fetchStatistics();
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
      console.log(response);
      if (error.response.status === 403) {
        navigate("/login")
      }
    }
  }

  return (
    <InvestorTopNavBar content={
      <div className="right-nav pt-4 pr-10 bg-background-green/10 top-15 right-20">
                    <h3 className="dash-board font-bold text-[#1B4332] text-4xl pl-10">Dashboard</h3>
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
                <h3 className="project font-bold text-black-600 text-2xl pl-10 pt-6"> Farm Projects</h3>
            <div className="product-details grid grid-cols-2 h-22 gap-x-14 ml p-8">
                <div className="project-one border-[2px]  border-custom-blue bg-white  rounded-xl h-96 .pl-20 font-bold text-black-600 text-lg pl-4">The Maize Project</div>
                <div className="project-two border-[2px]  border-custom-blue bg-white  rounded-xl h-96 pl-22 font-bold text-black-600 text-lg pl-4">The Yam Project</div>
            </div>
            <p className="mt-[2%] ml-[15px] text-right text-[25px] text-custom-blue w-[90%] ">view all</p>
        </div>
    }/>

    // <div className="investorDashboard">
    //   {topNav}
    //   <div className="content">
    //     <h2>Available Farm Projects</h2>
    //     {farmProjects.length === 0 ? (
    //       <p>No farm project available at the moment.</p>
    //     ) : (
    //       <ul className="farm-produce-list">
    //         {farmProjects.map((item) => (
    //           <li key={item.id}>
    //             <div className="item-image">
    //               <img src={item.picture} alt={item.name} />
    //             </div>
    //             <div className="item-details">
    //               <h3>{item.name}</h3>
    //               <p>{item.description}</p>
    //               <p>Unit of Measure: {item.uom}</p>
    //               <p>Quantity: {item.quantity}</p>
    //               <p>Time: {item.time}</p>
    //               <button className="btn">Add to Cart</button>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>
    // </div>
  );
};

export default InvestorDashboard;
