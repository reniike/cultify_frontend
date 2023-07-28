import AdminTopLeftNavBar from "../../adminTopLeftNavBar/components/AdminTopLeftNavBar";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../../../../api/axios";
import { setDataInStorage, getDataFromStorage } from "../../../../utils/app/Storage";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const admin = data?.data;
  const leftBar = data?.leftBar;
  console.log(admin); 
  const [statistics, setStatistics] = useState(()=>{
    const obj = getDataFromStorage(admin?.user?.id+"statistics");
    return obj != null ? obj: {}
  });
  
  useEffect(() => {
    if (admin == null || admin === undefined) {
      navigate("/login")
    }fetchStatistics();
  }, []);

  const fetchStatistics = async ()=>{    
    try {
      const request = {
        headers: {
          Authorization: "Bearer "+admin.access_token,
        }
      }
      const response = await axios.get("/getAdminDashboardStatistics", request);
      console.log(response.data);
      setDataInStorage(admin.user.id+"statistics", response.data)
      setStatistics(response.data);
    } catch (error) {
      let response = error.response;
      console.log(response);
      if (error?.response?.status === 403) {
        navigate("/login")
      }
    }
  }

  return (
    <AdminTopLeftNavBar
      navIndex={0}
      leftBar={leftBar}
      data={admin}
      content={
      <div className="right-nav pt-4 pr-10 bg-background-green/10 top-15 right-20">
                    <h3 className="dash-board font-bold text-[#1B4332] text-4xl pl-10">Admin Dashboard</h3>
            <div className="upper-boxes">
                    <h3 className="welcome font-bold text-black-500 text-2xl pl-10 pt-6" > Welcome, {admin?.user?.userResponse.firstName}</h3>
                <div className="investors-details grid grid-cols-3 h-13 gap-x-20 mr-6 p-6 ">
                      <div className="number border-[2px] shadow-lg bg-[#e6f2e3] w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3 mb-16 hover:shadow-xl transition duration-100 ease-in-out">
                        <h3 className="text-[#000000]">Total Number of<br/> Ongoing Farm projects</h3>
                        {/* <img className="h-[50%] mt-[3%]" src={ongoingProject} alt="" /> */}
                        <p className="mt-[16%] mr-[7%] text-[30px] text-right text-[#000000]">{statistics.totalNumberOfOngoingFarmProject}</p>
                      </div>
                      <div className="number border-[2px] shadow-lg bg-[#e6f2e3] w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3 mb-16 hover:shadow-xl transition duration-100 ease-in-out">
                        <h3 className="text-[#000000]">Total Amount of Money<br/>Invested by the<br /> Investors</h3>
                        <p className="mt-[7%] mr-[7%] text-[30px] text-right text-[#000000]">#{statistics.totalAmountOfMoneyInvestedByTheInvestors}</p>
                      </div>
                      <div className="number border-[2px] shadow-lg bg-[#e6f2e3] w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3 mb-16 hover:shadow-xl transition duration-100 ease-in-out">
                        <h3 className="text-custom-blue">Next <br/>Next Redeemed Project</h3>
                        {/* <img className="h-[50%] mt-[3%]" src={date} alt="" /> */}
                        <p className="mt-[16%] ml-[15px] text-right text-[25px] text-[#000000] w-[90%] ">{statistics.nextRedeemedProject}</p>
                      </div>
                      <div className="number border-[2px] shadow-lg bg-[#e6f2e3] w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3 mb-16 hover:shadow-xl transition duration-100 ease-in-out">
                        <h3 className="text-[#000000]">Total Number of<br/> Farmers</h3>
                        <p className="mt-[18%] ml-[15px] text-right text-[25px] text-[#000000] w-[90%] ">{statistics.totalNumberOfFarmers}</p>
                      </div>
                      <div className="number border-[2px] shadow-lg bg-[#e6f2e3] w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3 mb-16 hover:shadow-xl transition duration-100 ease-in-out">
                        <h3 className="text-[#000000]">Total Number of<br/> Investors</h3>
                        <p className="mt-[18%] mr-[7%] text-[30px] text-right text-[#000000]">{statistics.totalNumberOfInvestors}</p>
                      </div>
                      {admin?.user?.userResponse?.roles[0] === "SUPER_ADMIN"? (
                        <div className="number border-[2px] shadow-lg bg-[#e6f2e3] w-80 h-40 rounded-xl font-bold text-black-600 text-lg pl-3 mb-16 hover:shadow-xl transition duration-100 ease-in-out">
                          <h3 className="text-[#000000]">Total Number of<br/> System Administrators</h3>
                          <p className="mt-[18%] mr-[7%] text-[30px] text-right text-[#000000]">{statistics.totalNumberOfSystemAdmin}</p>
                        </div>
                      ): null}
                </div>  
            </div>
        </div>
    }/>
  );
};

export default AdminDashboard;
