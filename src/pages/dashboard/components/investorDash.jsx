import React from 'react';
import "../styles/investorDash.css";
import cultifyLogo from '../assets/logo.svg';
import dropDown from '../assets/dropDownIcon.svg';


const TopNavBar = () => {
  return (
    <nav className="body overflow-hidden">
        <div className="top-nav bg-white shadow-md p-2 md:p-5 w-full mx-auto h-14 flex justify-between items-center top-0 z-50">
            <img src={cultifyLogo} className="logo h-10 w-30" alt="Logo" />
            <img src={dropDown} className="drop" alt="drop" />
        </div >
        <div className="all flex justify-between">
            <div className="left-nav p-12 text-lg font-medium font-sans bg-green-800 w-19 flex rounded-none md:rounded-tr-2xl flex-col gap-6 h-1701 ">
                <l className="dash hover:bg-emerald-900"><a href="/dashboard" >Dashboard</a></l>
                <l className="dash hover:bg-emerald-900"><a href="/investments">Investments</a></l>
                <l className="dash hover:bg-emerald-900"><a href="/farm-projects">Farm Projects</a></l>
                <l className="dash hover:bg-emerald-900"><a href="/profile">Profile</a></l>
            </div>
        <div className="right-nav">
        <h3 className="dash-board"> DashBoard</h3>
            <div className="upper-boxes">
                    <h3> Welcome User </h3>
                <div className="investors-details grid grid-cols-3 h-180 gap-x-15 mr-7">
                    <div className="number border-1.1 bg-lime-200 w-80 h-40 rounded-xl">
                        Total Number of Investment</div>
                    <div className="amount border-1.1 bg-lime-200 w-80 rounded-xl">
                        Total Amount Invested</div>
                    <div className="payments  border-1.1 bg-lime-200 w-80 rounded-xl">
                        UpComing Payments</div>
                </div>
            </div>
            <h3> Farm Projects</h3>
            <div className="product-details grid grid-cols-2 h-180 gap-x-8 mr-70">
                <div className="project-one bg-lime-200 w-90 rounded-xl h-72">
                    The Maize Project</div>
                <div className="project-two  bg-lime-200 w-90 rounded-xl h-72">
                    The Yam Project</div>
            
            </div>
            
        </div>
        </div>
    </nav>
  );
};

export default TopNavBar;
