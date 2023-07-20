import {React, useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import AdminTopLeftNavBar from "./adminTopLeftNavBar";
import { useLocation } from "react-router-dom";
import axios from "../../../api/axios";

const FarmerListing = () => {
  const location = useLocation();
  const data = location.state;
  const admin = data.data;
  const leftBar = data.leftBar;
  const [farmers, setFarmers] = useState([]);
  const navigate = useNavigate();

  const fetchAllFarmers = async () => {
    const url = '/farmer/getAllFarmers';
    try {
        const response = await axios
            .get(url, {
                "headers": {
                    "Authorization": "Bearer "+admin.access_token,
                }
            });
        if (response.status === 200) {
            console.log(response.data)
            setFarmers(response.data)
        } else console.log(response)
    } catch (error) {
        console.log(error)
    }
};

useEffect(() => {
    if (data == null || data === undefined) {
      navigate("/login")
    }
  fetchAllFarmers();
}, []);

  return (
    <AdminTopLeftNavBar
      leftBar={leftBar}
      data={admin}
      content={
        <div className="pt-4 pr-10 bg-background-green/10 w-full h-full">
          <div className="flex justify-between mt-3 mb-10">
            <h1 className="ml-3 font-bold text-[20px] text-custom-green">
              FARMERS
            </h1>
          </div>

          <table class="w-full ">
            <thead className="border-b-2 border-gray-200 text-left">
              <tr>
                <th class="px-4 py-2 ">First Name</th>
                <th class="px-4 py-2 ">Last Name</th>
                <th class="px-4 py-2 ">Email Address</th>
                <th class="px-4 py-2 ">Phone Number</th>
              </tr>
            </thead>
            <tbody className="divide-y">
                {farmers.length === 0 ? (
                    <tr className='text-center'>
                        <div className='p-20 text-center'>NO REGISTERED FARMERS YET</div>
                    </tr>
                ) : (
                farmers.map((farmer, index)=>(
                <tr>
                  <td class="px-4 py-2 ">{farmer.userResponse.firstName}</td>
                  <td class="px-4 py-2">{farmer.userResponse.lastName}</td>
                  <td class="px-4 py-2">{farmer.userResponse.emailAddress}</td>
                  <td class="px-4 py-2">{farmer.userResponse.phoneNumber}</td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      }
    />
  );
};

export default FarmerListing;
