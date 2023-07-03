import React, { useState, useEffect } from "react";
import ConsumerTopNav from "./consumerTopNav";
import "../styles/consumerDashboard.css";

const ConsumerDashboard = () => {
  const [farmProduce, setFarmProduce] = useState([]);

  useEffect(() => {
    fetchFarmProduce();
  }, []);

  const fetchFarmProduce = async () => {
    const response = await fetch("/api/farm-produce");
    const data = await response.json();
    setFarmProduce(data);
  };

  return (
    <div className="consumerDashboard">
      <ConsumerTopNav/>
      <div className="content">
        <h2>Available Farm Produce</h2>
        {farmProduce.length === 0 ? (
          <p>No farm produce available at the moment.</p>
        ) : (
          <ul className="farm-produce-list">
            {farmProduce.map((item) => (
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

export default ConsumerDashboard;
