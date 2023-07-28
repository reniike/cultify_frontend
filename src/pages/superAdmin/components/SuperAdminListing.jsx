import {React, useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import AdminTopLeftNavBar from "../../admin/components/adminTopLeftNavBar/components/AdminTopLeftNavBar";
import { useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import { setDataInStorage, getDataFromStorage } from "../../utils/app/Storage";

const SuperAdminListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const admin = data.data;
  const leftBar = data.leftBar;
  const [systemAdministrators, setSystemAdministrators] = useState(()=>{
    const obj = getDataFromStorage(admin.user.id+"admins");
    return obj != null ? obj: []
  });
  const [adminPendingInvitation, setAdminPendingInvitation] = useState(()=>{
    const obj = getDataFromStorage(admin.user.id+"adminsPendingInvitation");
    return obj != null ? obj: []
  });

  const fetchAllAdministrators = async () => {
    const url = '/admin/findAll';
    try {
        const response = await axios
            .get(url, {
                "headers": {
                    "Authorization": "Bearer "+admin.access_token,
                }
            });
        if (response.status === 200) {
            console.log(response.data)
            setDataInStorage(admin.user.id+"admins", response.data)
            setSystemAdministrators(response.data)
        } else console.log(response)
    } catch (error) {
        console.log(error)
    }
};  

const fetchAllAdministratorsPendingInvitation = async () => {
  const url = '/superAdmin/getAllAdministratorsPendingInvitation';
  try {
      const response = await axios
          .get(url, {
              "headers": {
                  "Authorization": "Bearer "+admin.access_token,
              }
          });
      if (response.status === 200) {
          console.log(response.data.data)
          setDataInStorage(admin.user.id+"adminsPendingInvitation", response.data.data)
          setAdminPendingInvitation(response.data.data)
      } else console.log(response)
  } catch (error) {
      console.log(error)
  }
};

useEffect(() => {
  fetchAllAdministrators();
  fetchAllAdministratorsPendingInvitation();
}, []);

  return (
    <AdminTopLeftNavBar
      navIndex={5}
      leftBar={leftBar}
      data={admin}
      content={
        <div className="pt-4 pr-10 bg-background-green/10 w-full h-full">
          <div className="flex justify-between mt-3 mb-10">
          <h1 className="ml-3 font-bold text-[20px] text-custom-green">
              SYSTEM ADMINISTRATORS
            </h1>
            <button
              onClick={() => {
                navigate("/adminInvitationPage", {state: {"leftBar": leftBar, "data": admin}});
              }}
              className="bg-green-800 text-white text-[15px] w-30 p-1 rounded"
            >
              Invite an Admin
            </button>
          </div>
          <h1 className="ml-3 font-bold text-[15px] text-custom-green">
              REGISTERED ADMINISTRATORS
            </h1>

          <table class="w-full mt-[2%]">
            <thead className="border-b-2 border-gray-200 text-left">
              <tr>
                <th class="px-4 py-2 ">S/N</th>
                <th class="px-4 py-2 ">First Name</th>
                <th class="px-4 py-2 ">Last Name</th>
                <th class="px-4 py-2 ">Email Address</th>
                <th class="px-4 py-2 ">Phone Number</th>
              </tr>
            </thead>
            <tbody className="divide-y">
                {systemAdministrators.length === 0 ? (
                    <tr className='text-center'>
                        <div className='p-20 text-center'>No System Administrators</div>
                    </tr>
                ) : (
                systemAdministrators.map((administrator, index)=>(
                <tr>
                  <td class="px-4 py-2 ">{index+1}</td>
                  <td class="px-4 py-2 ">{administrator.userResponse.firstName}</td>
                  <td class="px-4 py-2">{administrator.userResponse.lastName}</td>
                  <td class="px-4 py-2">{administrator.userResponse.emailAddress}</td>
                  <td class="px-4 py-2">{administrator.userResponse.phoneNumber}</td>
                </tr>
              )))}
            </tbody>
          </table>
          
          <h1 className="ml-3 font-bold text-[15px] mt-[5%] text-custom-green">
              PENDING INVITATION
            </h1>

          <table class="w-full mt-[2%]">
            <thead className="border-b-2 border-gray-200 text-left">
              <tr>
                <th class="px-4 py-2 ">S/N</th>
                <th class="px-4 py-2 ">Email Address</th>
              </tr>
            </thead>
            <tbody className="divide-y">
                {adminPendingInvitation.length === 0 ? (
                    <tr className='text-center'>
                        <div className='p-20 text-center'>No pending invitation</div>
                    </tr>
                ) : (
                adminPendingInvitation.map((administrator, index)=>(
                <tr>
                  <td class="px-4 py-2 ">{index+1}</td>
                  <td class="px-4 py-2">{administrator.email}</td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      }
    />
  );
};

export default SuperAdminListing;
