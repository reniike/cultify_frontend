import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TopLeftNavBar from "./topLeftNavBar";

import "../styles/topNav.css";
const AdminTopLeftNavBar = ({data, content, leftBar}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (data == null || data === undefined) {
      navigate("/login")
    }else{
    }
  }, []);

  const handleClick = (e) => {
    console.log(e.target.id);
    const index = e.target.id;
    if (index === "Dashboard") {
      navigate("/admin/dashboard", { state: {"data": data, "leftBar": leftBar} });
    }
    if (index === "Farm Projects") {
      navigate("/admin/dashboard/projects", { state: {"data": data, "leftBar": leftBar}});
    }
    if (index === "System Administrators") {
      navigate("/super-admin/administrators", { state: {"data": data, "leftBar": leftBar}});
    }
    if (index === "Investments") {
      navigate("/super-admin/dashboard/investments", { state: {"data": data, "leftBar": leftBar}});
    }
    if (index === "Investors") {
      navigate("/admin/dashboard/investors", { state: {"data": data, "leftBar": leftBar}});
    }
    if (index === "Farmers") {
      navigate("/admin/dashboard/farmers", { state: {"data": data, "leftBar": leftBar}});
    }
  };

  return (
    <>
      <TopLeftNavBar data={data}/>
      <div className="flex">
        <div className="left-nav list-none text-lg font-sans bg-green-800 w-1/6 rounded-none md:rounded-tr-2xl flex-col gap-6 items-start pl-0">
          <ul className="pl-0 pt-6 gap-3">
            {leftBar.map(
              (each, index) => (
                <li
                  key={index}
                  className="dash text-white pl-4 pt-6 pb-6 hover:bg-emerald-900 rounded-xl hover:text-lime-200"
                  id={each}
                  onClick={handleClick}
                >
                  {each}
                </li>
              )
            )}
          </ul>
        </div>
        <div className="right-content ml-1/6 flex-grow">{content}</div>
      </div>
    </>
  );
};

export default AdminTopLeftNavBar;
