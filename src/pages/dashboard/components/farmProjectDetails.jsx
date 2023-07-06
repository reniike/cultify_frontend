import React from "react";
import { useParams } from "react-router-dom";
import "../styles/farmProjectDetails.css";
import TopNav from "./topNav";


const FarmProjectDetails = () => {
  const farmProduces = [];
  const { id } = useParams();
  const produce = farmProduces.find((item) => item.id === parseInt(id));

  return (
    <div className="produce-details">
      <TopNav/>
      <div className="container">
        <h2>{produce.name}</h2>
        <div className="produce-info">
          <div className="produce-image">
            <img src={produce.picture} alt={produce.name} />
          </div>
          <div className="produce-description">
            <p>
              <strong>Description:</strong> {produce.description}
            </p>
            <p>
              <strong>Unit of Measure:</strong> {produce.uom}
            </p>
            <p>
              <strong>Quantity:</strong> {produce.quantity}
            </p>
            <p>
              <strong>Time:</strong> {produce.time}
            </p>
          </div>
        </div>
        <div className="back-link">
          <a href="/">Back to Dashboard</a>
        </div>
      </div>
    </div>
  );
};

export default FarmProjectDetails;
