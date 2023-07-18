import React from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminTopLeftNavBar from "./superAdminTopLeftNavBar";
import { useLocation } from "react-router-dom";

const SuperAdmin = () => {
  const navigate = useNavigate();
  const data = useLocation().state;
  return (
    <SuperAdminTopLeftNavBar
      content={
        <div className="pt-4 pr-10 bg-background-green/10 w-full h-full">
          <div className="flex justify-between mt-3 mb-10">
            <h1 className="ml-3 font-bold text-[20px] text-custom-green">
              Super-Admin Dashboard
            </h1>
            <button
              onClick={() => {
                navigate("/adminInvitationPage", { state: data });
              }}
              className="bg-green-800 text-white text-[15px] w-30 p-1 rounded"
            >
              Invite Admin
            </button>
          </div>

          <table class="w-full ">
            <thead className="border-b-2 border-gray-200 text-left">
              <tr>
                <th class="px-4 py-2 ">First name</th>
                <th class="px-4 py-2 ">Last name</th>
                <th class="px-4 py-2 ">Email adress</th>
                <th class="px-4 py-2 ">Phone number</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td class="px-4 py-2 ">Sgreen</td>
                <td class="px-4 py-2">Green</td>
                <td class="px-4 py-2">Sabo</td>
                <td class="px-4 py-2">1234</td>
              </tr>
              <tr>
                <td class="px-4 py-2">Moyin</td>
                <td class="px-4 py-2">Mikki</td>
                <td class="px-4 py-2">Sabo</td>
                <td class="px-4 py-2">123</td>
              </tr>
              <tr>
                <td class="px-4 py-2">Moyin</td>
                <td class="px-4 py-2">Mikki</td>
                <td class="px-4 py-2">Sabo</td>
                <td class="px-4 py-2">123</td>
              </tr>
              <tr>
                <td class="px-4 py-2">Moyin</td>
                <td class="px-4 py-2">Mikki</td>
                <td class="px-4 py-2">Sabo</td>
                <td class="px-4 py-2">123</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
    />
  );
};

export default SuperAdmin;
