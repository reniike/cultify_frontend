import axios from '../../../../api/axios';
import React, { useState, useEffect } from 'react';
import InvestorTopLeftNav from '../../../investor/utils/InvestorTopLeftNav';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setDataInStorage, getDataFromStorage } from '../../../utils/app/Storage';

const InvestorInvestmentTable = () => {    
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    const [investmentTable, setInvestmentTable] = useState(()=>{
        const obj = getDataFromStorage(data.user.id+"investments");
        return obj != null ? obj: []
      });

    const processWithdrawal = ()=>{

    }

    useEffect(() => {
        if (data == null || data === undefined) {
          navigate("/login")
        }
      }, []);

    const getAllInvestments = async () => {
        const url = '/investment/getAllInvestmentsByEmail/'+data.user.userResponse.emailAddress;
        try {
            const response = await axios
                .get(url, {
                    "headers": {
                        "Authorization": "Bearer "+data.access_token,
                    }
                })
            if (response.status === 200) {
                console.log(response.data)
                setDataInStorage(data.user.id+"investments", response.data)
                setInvestmentTable(response.data)
            } else console.log(response)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllInvestments();
    }, []);

    const getExpectedAmount = (amount, roi)=>{
        const roiInDecimal = roi/100;
        const interest = amount * roiInDecimal;
        const expectedAmount = amount + interest;
        return expectedAmount;
    }

    const isMatured = (date)=>{
        const actualDate = new Date(date)
        const dates = actualDate.getDate();
        const month = actualDate.getMonth()+1;
        const year = actualDate.getFullYear();

        const todayDate = new Date();
        const currentDate = todayDate.getDate();
        const currentMonth = todayDate.getMonth()+1;
        const currentYear = todayDate.getFullYear();

        if(currentYear > year) return true;
        else if(currentYear === year){
            if(currentMonth > month) return true;
            else if(currentMonth === month){
                if(currentDate >= dates) return true;
            }
        }
        return false;
    }

    return (
        <InvestorTopLeftNav
            data={data}
            navIndex={1}
            content={
                <div className="right-nav pr-10 top-15 right-20 overflow-hidden">
                    <h3 className="font-bold text-green-500 text-2xl pl-10">Ongoing investments</h3>

                    <div className='w-full border-spacing-[10px] mt-3'>
                        <div className='w-full justify-center items-center flex h-[100%] overflow-hidden'>
                            <table className='w-[950px] h-fit rounded-xl z-10 table bg-custom-green/5 border-spacing-[10px] table-auto border-collapse'>
                                <thead className=''>
                                    <tr>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>S/N</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Project Name</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Amount Invested</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>ROI</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Expected Amount</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Start Date</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Maturity Date</th>
                                        <th className='border-b-2 border-b-custom-blue border-solid'>Action</th>
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
                                                <td className="text-center">{investment.amount}</td>
                                                <td className="text-center">{investment.roi}%</td>
                                                <td className="text-center">{getExpectedAmount(investment.amount, investment.roi)}</td>
                                                <td className="text-center">{investment.startingDate}</td>
                                                <td className="text-center">{investment.redemptionDate}</td>
                                                <td className="text-center">
                                                    <div className='p-[18px] border-b-5 border-black'>
                                                    <button
                                                            onClick={processWithdrawal}
                                                            disabled={!isMatured(investment.redemptionDate)}
                                                            className={`p-2 rounded-md ${
                                                                !isMatured(investment.redemptionDate)
                                                                    ? 'bg-custom-dead text-gray-500'
                                                                    : 'bg-custom-green text-white'
                                                            }`}
                                                        >
                                                            Withdraw
                                                        </button>
                                                    </div>
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

export default InvestorInvestmentTable;