import React from 'react';
// import "../styles/investorDash.css"; 
import cultifyLogo from '../assets/logo.svg';
import dropDown from '../assets/dropDownIcon.svg';


const TopNavBar = () => {

     
  return (
    <nav className="body overflow-hidden bg-blue-100">
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
            
        <div className="right-nav pt-4 pr-10 top-15 right-20">
                    <h3 className="dash-board font-bold text-green-500 text-4xl pl-10"> Dashboard</h3>
            <div className="upper-boxes">
                    <h3 className="welcome font-bold text-black-500 text-2xl pl-10 pt-6" > Welcome User </h3>
                <div className="investors-details grid grid-cols-3 h-13 gap-x-20 mr-6 p-6">
                    <div className="number border-1.1 bg-white w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3">Total Number of<br/> Investments</div>
                    <div className="amount border-1.1 bg-white w-80 rounded-xl font-bold text-black-600 text-lg pl-3">Total Amount <br/>Invested</div>
                    <div className="payments border-1.1 bg-white w-80 rounded-xl font-bold text-black-600 text-lg pl-3">UpComing <br/>Payments</div>
                </div>
            </div>
                    <h3 className="project font-bold text-black-600 text-2xl pl-10 pt-6"> Farm Projects</h3>
            <div className="product-details grid grid-cols-2 h-22 gap-x-14 ml p-8">
                <div className="project-one bg-white rounded-xl h-96 pl-20 font-bold text-black-600 text-lg pl-4">The Maize Project</div>
                <div className="project-two  bg-white  rounded-xl h-96 pl-22 font-bold text-black-600 text-lg pl-4">The Yam Project</div>
    
            </div>
        </div>
        </div>
        
    </nav>
  );
};

export default TopNavBar;
