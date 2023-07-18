import React, {useEffect, useState} from 'react'
import AdminTopLeftNavBar from './adminTopLeftNavBar'
import axios from '../../../api/axios'

const AdminInvestorsList = () => {
    const url = 'http://localhost:8080/semicolon/cultify/v1/api/investor/getAllInvestors'
    const [tableOfInvestors, setTableOfInvestors] = useState([]);

    const getAllInvestors = async () => {
        try{
            const response = await axios.get(url)
            console.log(response.data)
            // if (response.status !== "AxiosError"){
            //     console.log(response.data)
            //     setTableOfInvestors(response.data)
            // }else console.log(response.data)
        }catch(error){
            console.log(error)
        }
    };

    useEffect(()=> {
        getAllInvestors();
    }, []);

  return (

    <AdminTopLeftNavBar content={ 
            <div>
                <div> <h3 className="text-custom-green text-2xl font-bold ml-8 mb-10 mt-6">Admin Dashboard</h3> </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b-4 border-gray-200 text-left ml-10">
                            <th  class="px-4 py-2" >ID</th>
                            <th  class="px-4 py-2" >First Name</th>
                            <th  class="px-4 py-2" >Last Name</th>
                            <th  class="px-4 py-2" >Email Address</th>
                            <th  class="px-4 py-2" >Phone Number</th>
                            <th  class="px-4 py-2" >Password</th>
                            <th  class="px-4 py-2" >Date Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td class="px-4 py-2 ">001</td>
                        <td class="px-4 py-2 ">Sunny</td>
                        <td class="px-4 py-2">Green</td>
                        <td class="px-4 py-2">Sgreen@gmail.com</td>
                        <td class="px-4 py-2">09012345678</td>
                        <td class="px-4 py-2">1234</td>
                        <td class="px-4 py-2">20-12-2022</td>

                    </tbody>
                </table>
            </div>
        
    }/>
  )

}
export default AdminInvestorsList;
