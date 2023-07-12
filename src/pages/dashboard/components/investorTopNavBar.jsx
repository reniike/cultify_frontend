import React from 'react';
import "../styles/investorDash.css"; 
import cultifyLogo from '../assets/logo.svg';
import dropDown from '../assets/dropDownIcon.svg';


const InvestorTopNavBar = ({content}) => {

     
  return (
    <nav className="body overflow-hidden">
        <div className="top-nav bg-white shadow-md p-2 md:p-5 w-full mx-auto h-14 flex justify-between items-center top-0 z-50">
            <img src={cultifyLogo} className="logo h-10 w-30" alt="Logo" />
            <img src={dropDown} className="drop" alt="drop" />
        </div >
        
        <div className="all flex justify-between">
      
          
            <div className="left-nav list-none text-lg font-sans bg-green-800 w-1/6 rounded-none md:rounded-tr-2xl flex-col gap-6 items-start pl-0">
                <ul class= "pl-0 pt-6 gap-3">
                    <li className="dash text-white pl-4 pt-6 pb-6 hover:bg-emerald-900 rounded-xl hover:text-lime-200" href='/dashboard' >Dashboard</li>
                    <li className="dash text-white pl-4 pt-6 pb-6 hover:bg-emerald-900 rounded-xl hover:text-lime-200" href="/investments">Investments</li>
                    <li className="dash text-white pl-4 pt-6 pb-6 hover:bg-emerald-900 rounded-xl hover:text-lime-200" href="/farm-projects">Projects</li>
                    <li className="dash text-white pl-4 pt-6 pb-6 hover:bg-emerald-900 rounded-xl hover:text-lime-200" href="/profile">Profile</li>
                </ul>
            </div>
            {content}
        </div>
        
    </nav>
  );
};

export default InvestorTopNavBar;
