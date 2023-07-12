import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopNav from "./topNav";
import InvestorTopNavBar from "./investorTopNavBar";
import { useNavigate } from "react-router-dom";

const InvestorDashboard = () => {
  const [farmProjects, setFarmProduce] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;

  useEffect(() => {
    if (user == null || user === undefined) {
      navigate("/home")
    }
    fetchFarmProduce();
  }, [farmProjects]);

  const fetchFarmProduce = async () => {
    const response = await fetch("/api/farm-produce");
    const data = await response.json();
    setFarmProduce(data);
  };
  

  return (
    <InvestorTopNavBar content={
      <div className="right-nav pt-4 pr-10 bg-sky-50 top-15 right-20">
                    <h3 className="dash-board font-bold text-green-500 text-4xl pl-10"> DashBoard</h3>
            <div className="upper-boxes">
                    <h3 className="welcome font-bold text-black-500 text-2xl pl-10 pt-6" > Welcome, {user?.userResponse.firstName}</h3>
                <div className="investors-details grid grid-cols-3 h-13 gap-x-20 mr-6 p-6">
                    <div className="number border-[2px]  border-custom-blue bg-white w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3">Total Number of<br/> Investments</div>
                    <div className="amount border-[2px]  border-custom-blue bg-white w-80 rounded-xl font-bold text-black-600 text-lg pl-3">Total Amount <br/>Invested</div>
                    <div className="payments border-[2px]  border-custom-blue bg-white w-80 rounded-xl font-bold text-black-600 text-lg pl-3">UpComing <br/>Payments</div>
                </div>
            </div>
                    <h3 className="project font-bold text-black-600 text-2xl pl-10 pt-6"> Farm Projects</h3>
            <div className="product-details grid grid-cols-2 h-22 gap-x-14 ml p-8">
                <div className="project-one border-[2px]  border-custom-blue bg-white  rounded-xl h-96 .pl-20 font-bold text-black-600 text-lg pl-4">The Maize Project</div>
                <div className="project-two border-[2px]  border-custom-blue bg-white  rounded-xl h-96 pl-22 font-bold text-black-600 text-lg pl-4">The Yam Project</div>
    
            </div>
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
