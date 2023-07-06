import React, { } from 'react';
import '../styles/superAdminDashboard.css';
import SuperAdminDashboard from './superAdminDashboard';
import { useNavigate } from 'react-router-dom';


const SuperAdminDashboardOptions = () => {

  const navigate = useNavigate();
  const changeDashboardOptions = (e)=>{
    const id = String(e.target.id);
    if(id.toLocaleUpperCase() === "ADMINS"){
      navigate("/super-admin/dashboard/admins");
    };
  };

  const content = <div>
    <h1>Super Admin Dashboard</h1>
    <div className="options">
    {
        ["Admins", "Farmers", "Investors"].map((each, index)=>(
            <button type='submit' id={each} className="board" key={index} onClick={changeDashboardOptions}>
              {each}
            </button>
        ))
    }
</div>
  </div>
  return (
    <React.Fragment>
      <SuperAdminDashboard content={content}/>
    </React.Fragment>
  );
};

export default SuperAdminDashboardOptions;