import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTopLeftNavBar from "../../adminTopLeftNavBar/components/AdminTopLeftNavBar";
import { useLocation } from "react-router-dom";
import axios from "../../../../../api/axios";

const InvestorListing = () => {
    const location = useLocation();
    const data = location.state;
    const admin = data.data;
    const leftBar = data.leftBar;
    const [investors, setInvestors] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (data == null || data === undefined) {
            navigate("/login")
        }
    }, []);

    const fetchAllInvestors = async () => {
        const url = '/investor/getAllInvestors';
        try {
            const response = await axios
                .get(url, {
                    "headers": {
                        "Authorization": "Bearer " + admin.access_token,
                    }
                });
            if (response.status === 200) {
                console.log(response.data)
                setInvestors(response.data)
            } else console.log(response)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchAllInvestors();
    }, []);

    return (
        <AdminTopLeftNavBar
            navIndex={3}
            leftBar={leftBar}
            data={admin}
            content={
                <div className="pt-4 pr-10 bg-background-green/10 w-full h-full">
                    <div className="flex justify-between mt-3 mb-10">
                        <h1 className="ml-3 font-bold text-[20px] text-custom-green">
                            INVESTORS
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
                            {investors.length === 0 ? (
                                <tr className='text-center'>
                                    <div className='p-20 text-center'>NO REGISTERED INVESTORS YET</div>
                                </tr>
                            ) : (
                                investors.map((investor, index) => (
                                    <tr>
                                        <td class="px-4 py-2 ">{investor.userResponse.firstName}</td>
                                        <td class="px-4 py-2">{investor.userResponse.lastName}</td>
                                        <td class="px-4 py-2">{investor.userResponse.emailAddress}</td>
                                        <td class="px-4 py-2">{investor.userResponse.phoneNumber}</td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
            }
        />
    );
};

export default InvestorListing;