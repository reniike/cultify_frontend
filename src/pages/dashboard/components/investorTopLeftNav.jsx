import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopLeftNavBar from './topLeftNavBar';
import '../styles/topNav.css';

const InvestorTopLeftNav = ({ data, content }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(e.target.id);
    const index = e.target.id;
    if (index === '0') {
      navigate('/investor/dashboard', { state: data });
    }
    if (index === '1') {
      navigate('/investor/dashboard/investments', { state: data });
    }
    if (index === '2') {
      console.log('projects');
      navigate('/investor/dashboard/projects', { state: data });
    }
  };

  return (
    <>
      <TopLeftNavBar />
      <div className="flex">
        <div className="left-nav list-none text-lg font-sans bg-green-800 w-1/6 rounded-none md:rounded-tr-2xl flex-col gap-6 items-start pl-0">
          <ul className="pl-0 pt-6 gap-3">
            {['Dashboard', 'Investments', 'Projects', 'Profile'].map((each, index) => (
              <li
                key={index}
                className="dash text-white pl-4 pt-6 pb-6 hover:bg-emerald-900 rounded-xl hover:text-lime-200"
                id={index}
                onClick={(e)=>handleClick(e)}
              >
                {each}
              </li>
            ))}
          </ul>
        </div>
        <div className="right-content ml-1/6 flex-grow">
          {content}
        </div>
      </div>
    </>
  );
};

export default InvestorTopLeftNav;
