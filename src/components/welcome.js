

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Customer from './Customer';
import Farmer from './Farmer';
import Transporter from './Transporter';
import './welcome.css';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
//   const [farmer, setFarmer] = useState(false);
//   const [customer, setCustomer] = useState(false);
//   const [transporter, setTransporter] = useState(false);

  const clickFarmer = (event) => {
    navigate("/farmer/registration");
  };

  const clickCustomer = (event) => {
    // setCustomer(true);
  };

  const clickTransporter = (event) => {
    // setTransporter(true);
  };

  return (
    <div className='welcome'>
      <h2>Choose Your Category</h2>
      <button type="button" onClick={clickCustomer}> 
      <Link to="/customer">Customer</Link>
      </button>
      <button type="button" onClick={clickFarmer}>
        <Link to="/farmer">Farmer</Link>
      </button>
      <button type="button" onClick={clickTransporter}>
        <Link to="/transporter">Transporter</Link>
      </button>

      
    </div>
  );
};

export default Welcome;

