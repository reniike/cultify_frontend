import {React, useEffect, useState} from "react";
import axios from "../../../api/axios";
import AdminCard from './adminCard';
import SuperAdminDashboard from "./superAdminDashboard";

export default function Admins(){
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
      const fetchAdmins = async () => {
        try {
          const response = await axios.get('/api/admins'); // Replace with the actual API endpoint
          setAdmins(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchAdmins();
    }, []);

    const content =  <div className="admin-list">
                        ADMIN
                        {admins.map((admin) => (
                        <AdminCard key={admin.id} admin={admin} />
                        ))}
                      </div>;

    return(
          <SuperAdminDashboard content={content}/>
    )
}