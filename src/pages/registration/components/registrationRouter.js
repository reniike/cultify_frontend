
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './registrationRouter.css';
import { useNavigate } from 'react-router-dom';

const RegistrationRouter = () => {
    const navigate = useNavigate();


  const clickFarmer = (event) => {
    navigate("/registration/farmer");
  };

  const clickConsumer = (event) => {
    navigate("/registration/consumer");
  };

  const clickTransporter = (event) => {
    navigate("/registration/transporter");
  };

  return (
    <div className='welcome'>
      <h2>Choose Your Category</h2>
      <button type="button" onClick={clickConsumer}>Customer</button>
      <button type="button" onClick={clickFarmer}>Farmer</button>
      <button type="button" onClick={clickTransporter}>Transporter</button>
      
    </div>
  );
};

export default RegistrationRouter;

