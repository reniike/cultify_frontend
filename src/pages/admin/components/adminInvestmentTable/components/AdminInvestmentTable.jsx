import axios from '../../../../../api/axios';
import React, { useState, useEffect } from 'react';
import AdminTopLeftNavBar from '../../adminTopLeftNavBar/components/AdminTopLeftNavBar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setDataInStorage, getDataFromStorage } from '../../../../utils/app/Storage';

const AdminInvestmentTable = () => {
    const location = useLocation();
    const data = location.state;
    const admin = data.data;
    const leftBar = data.leftBar;
    console.log(admin);
    const [investmentTable, setInvestmentTable] = useState(()=>{
        const obj = getDataFromStorage(admin.user.id+"investments");
        return obj != null ? obj: []
      });
    const navigate = useNavigate();

    const processWithdrawal = () => {

    }

    const getAllOngoingProjectInvestmentsStatistics = async () => {
        const url = '/getAllOngoingProjectInvestmentsStatistics';
        try {
            const response = await axios
                .get(url, {
                    "headers": {
                        "Authorization": "Bearer " + admin.access_token,
                    }
                });
            if (response.status === 200) {
                console.log(response.data)
                setDataInStorage(admin.user.id+"investments", response.data)
                setInvestmentTable(response.data)
            } else console.log(response)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (data == null || data === undefined) {
            navigate("/login")
        }
        getAllOngoingProjectInvestmentsStatistics();
    }, []);

    const getExpectedAmount = (amount, roi) => {
        const roiInDecimal = roi / 100;
        const interest = amount * roiInDecimal;
        const expectedAmount = amount + interest;
        return expectedAmount;
    }

    const isMatured = (date) => {
        const actualDate = new Date(date)
        const dates = actualDate.getDate();
        const month = actualDate.getMonth() + 1;
        const year = actualDate.getFullYear();

        const todayDate = new Date();
        const currentDate = todayDate.getDate();
        const currentMonth = todayDate.getMonth() + 1;
        const currentYear = todayDate.getFullYear();

        if (currentYear > year) return true;
        else if (currentYear === year) {
            if (currentMonth > month) return true;
            else if (currentMonth === month) {
                if (currentDate >= dates) return true;
            }
        }
        return false;
    }

    return (
        <AdminTopLeftNavBar
            navIndex={2}
            leftBar={leftBar}
            data={admin}
            content={
                <div className="right-nav pt-4 pr-10 top-15 right-20 overflow-hidden">
                    <h3 className="font-bold text-green-500 text-2xl pl-10 mt-4">Ongoing investments</h3>

                    <div className='w-full border-spacing-[10px]'>
                        <div className='w-full justify-center items-top flex h-[1000px] overflow-hidden mt-[2%]'>
                            <table className='w-[950px] h-fit rounded-xl z-10 table bg-custom-green/5 border-spacing-[10px] table-auto border-collapse'>
                                <thead>
                                    <tr>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>S/N</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Project Name</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Number of Investors</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Total Amount Invested</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>ROI</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Total Expected Amount</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Maturity Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {investmentTable.length === 0 ? (
                                        <tr className='text-center'>
                                            <div className='p-20 text-center'>No available investments</div>
                                        </tr>
                                    ) : (
                                        investmentTable.map((investment, index) => (
                                            <tr key={investment.id}>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{investment.farmProjectName}</td>
                                                <td className="text-center">{investment.numberOfInvestors}</td>
                                                <td className="text-center">#{investment.totalAmountInvested}</td>
                                                <td className="text-center">{investment.roi}%</td>
                                                <td className="text-center">#{investment.totalExpectedAmount}</td>
                                                <td className="text-center">{investment.maturityDate}</td>
                                                <td className="text-center">
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div />
                </div>} />
    );
};

export default AdminInvestmentTable;