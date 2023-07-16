import React from "react";
import { useParams, useLocation, useNavigate, json } from "react-router-dom";
import { useState } from "react";
import InvestorTopLeftNav from "./investorTopLeftNav";
import defaultFarmProjectPicture from "../../../assets/images/farmProject.jpg";
import { usePaystackPayment } from "react-paystack";
import axios from "../../../api/axios";
import { useCallback } from "react";

const FarmProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const farmProjects = location.state.farmProjects;
  const investor = location.state.data;
  const project = farmProjects[id];
  const [amount, setAmount] = useState(0);
  const [units, setUnits] = useState(0);
  console.log(investor);
  console.log(project);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: investor.user.userResponse.emailAddress,
    amount: amount,
    publicKey: 'pk_test_df4962a615cd623dfe64e3038c7576e6783273a2'
  };

  const onSuccess = (reference) => {
    console.log(reference);
    createInvestment();
  };

  const createInvestment = async () => {
    const url = "/investment/initiateInvestment";
    const request = {
      "investorId": investor.user.id,
      "farmProjectId": project.id,
      "amount": amount / 100,
      "InvestmentReturnType": "MONEY",
      "startingDate": project.investmentPlan.startDate,
      "redemptionDate": project.investmentPlan.maturityDate
    };
  
    try {
      console.log(request);
      const response = await axios.post(url, request, {        
        "headers": {
          "Authorization": 'Bearer '+investor.access_token,
        },
      });  
      if (response.status  == 200) {
        console.log(response);
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
      console.error("Error:", error.message);
    }
  };
  

  const onClose = () => {
    console.log('closed')
  }

  const handleChangeUnits = (event) => {
    const value = event.target.value;
    setUnits(value);
    setAmount((project.investmentPlan.amountPerUnit * value)*100);
  };

  const initializePayment = usePaystackPayment(config);

  const getDate = (date) => {
    const dateInString = new Date(date);
    const day = dateInString.getDate();
    const month = dateInString.getMonth();
    const year = dateInString.getFullYear();
    return day + "/" + month + "/" + year;
  }

  return (
    <>
      <InvestorTopLeftNav 
        data={investor}
        content={          
          <div className="flex justify-center items-center mt-8">
            <div className="max-w-4xl w-full rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative h-80">
                  <img
                    src={project.picture ? project.picture : defaultFarmProjectPicture}
                    alt={project.farmProduceSummary}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-4">{project.farmProduceSummary}</h3>
                  <div className="mb-2 text-xl">Location: {project.location}</div>
                  <div className="mb-2 text-xl">Unit price: #{project.investmentPlan.amountPerUnit}</div>
                  <div className="mb-2 text-xl">From: {getDate(project.investmentPlan.startDate)}</div>
                  <div className="mb-4 text-xl">To: {getDate(project.investmentPlan.maturityDate)}</div>
                  <div className="mb-4">
                    <label className="text-xl">Number of Units:</label>
                    <input
                      type="number"
                      className="ml-2 px-4 py-2 border rounded-lg"
                      value={units}
                      onChange={handleChangeUnits}
                      min={1}
                    />
                  </div>
                  <button 
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    onClick={()=>initializePayment(onSuccess, onClose)}
                  >
                    Invest Now
                  </button>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Project Description:</h4>
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default FarmProjectDetails;
