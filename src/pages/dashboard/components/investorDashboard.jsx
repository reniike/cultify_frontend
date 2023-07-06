import React, { useState, useEffect } from "react";
import TopNav from "./topNav";
import "../styles/investorDashboard.css";

const InvestorDashboard = () => {
  const [farmProjects, setFarmProduce] = useState([]);

  useEffect(() => {
    fetchFarmProduce();
  }, []);

  const fetchFarmProduce = async () => {
    const response = await fetch("/api/farm-produce");
    const data = await response.json();
    setFarmProduce(data);
  };

  const topNav = <TopNav links={
    [
      {
        "name": "Dashboard",
        "url": "/dashboard"
      },
      {
        "name": "Transactions",
        "url": "/transactions"
      },
      {
        "name": "Profile",
        "url": "/profile"
      },
      {
        "name": "Logout",
        "url": "/logout"
      }
    ]
  }/>
  

  return (
    <div className="investorDashboard">
      {topNav}
      <div className="content">
        <h2>Available Farm Projects</h2>
        {farmProjects.length === 0 ? (
          <p>No farm project available at the moment.</p>
        ) : (
          <ul className="farm-produce-list">
            {farmProjects.map((item) => (
              <li key={item.id}>
                <div className="item-image">
                  <img src={item.picture} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Unit of Measure: {item.uom}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Time: {item.time}</p>
                  <button className="btn">Add to Cart</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;
