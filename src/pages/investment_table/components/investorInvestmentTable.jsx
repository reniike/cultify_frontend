import axios from '../../../api/axios';
import React, { useState, useEffect } from 'react';
import InvestorTopNavBar from '../../dashboard/components/investorTopNavBar';

const InvestorInvestmentTable = () => {
    const url = '/investment/getAllInvestmentsByEmail/{email}';

    const [investmentTable, setInvestmentTable] = useState([]);

    const getAllInvestments = async () => {
        try {
            const response = await axios
                .get(url, {
                    "headers": {
                        "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODk2NTEyNjYsImV4cCI6MTcwMTY1MTI2Niwicm9sZXMiOnsiY2xhaW0xIjoiSU5WRVNUT1IifX0.7lnusn9_k60OxINatu-F8wrWMlmKSBkndrY_IUI64miWHjM5_my_icQDV4YL-oepM6AherJAFjZHjxBGGMdLPA",
                    }
                })
            if (response.status === 200) {
                console.log(response.data)
                setInvestmentTable(response.data)
            } else console.log(response)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllInvestments();
    }, []);


    return (
        <InvestorTopNavBar content={
            <div className="right-nav pt-4 pr-10 top-15 right-20 overflow-hidden">
                <h3 className="font-bold text-green-500 text-2xl pl-10 mb-[-33%] mt-7">Ongoing investments</h3>

                <div className='w-full border-spacing-[10px]'>
                    <div className='w-full justify-center items-center flex h-[1000px] overflow-hidden'>
                        <table className='w-[950px] h-fit rounded-xl z-10 table bg-custom-green/5 border-spacing-[10px] table-auto border-collapse'>
                            <thead className='m-10'>
                                <tr>
                                    <th className='border-b-2 border-b-custom-blue border-solid'>Project name</th>
                                    <th className='border-b-2 border-b-custom-blue border-solid'>Return type</th>
                                    <th className='border-b-2 border-b-custom-blue border-solid'>ROI</th>
                                    <th className='border-b-2 border-b-custom-blue border-solid'>Start date</th>
                                    <th className='border-b-2 border-b-custom-blue border-solid'>Maturity date</th>
                                    <th className='border-b-2 border-b-custom-blue border-solid'>Withdraw</th>
                                </tr>
                            </thead>
                            <tbody>
                                {investmentTable.length === 0 ? (
                                    <tr className='text-center'>
                                        <div className='p-20 text-center'>No available investments</div>
                                    </tr>
                                ) : (
                                    investmentTable.map((investment) => (
                                        <tr key={investment.id}>
                                            <td className="text-center">{investment.farmProduceSummary}</td>
                                            <td className="text-center">{investment.returnType}</td>
                                            <td className="text-center">{investment.roi}</td>
                                            <td className="text-center">{new Date(investment.startingDate).toLocaleDateString('en-GB')}</td>
                                            <td className="text-center">{new Date(investment.redemptionDate).toLocaleDateString('en-GB')}</td>
                                            <td className="text-center">
                                                <div className='p-[18px] border-b-5 border-black'>
                                                    <button className='bg-custom-green p-2'>Withdraw</button>
                                                </div>
                                            </td>
                                            
                                        </tr>
                                    ))
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div />
            </div>} />
    );
};

export default InvestorInvestmentTable;
