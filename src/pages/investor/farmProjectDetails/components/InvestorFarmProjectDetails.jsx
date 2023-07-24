import { React, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import InvestorTopLeftNav from "../../utils/InvestorTopLeftNav";
import defaultFarmProjectPicture from "../../../../assets/images/farmProject.jpg";
import { usePaystackPayment } from "react-paystack";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../api/axios";

const InvestorFarmProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const farmProjects = location.state.farmProjects;
  const investor = location.state.data;
  const project = farmProjects[id];
  const [amount, setAmount] = useState(0);
  const [units, setUnits] = useState(1);
  const [projectHasBeenInvested, setProjectHasBeenInvested] = useState(false);
  const [projectHasNowBeenInvested, setProjectHasNowBeenInvested] = useState(false);
  const projectIds = [];
  const [toastResponse, setToastResponse] = useState("");
  console.log(investor);
  console.log(project);


  const showToast = () => {
    toast(toastResponse, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "dark",
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
    });
  };

  useEffect(() => {
    if (investor == null || investor === undefined) {
      navigate("/login")
    }
    setAmount((project.investmentPlan.amountPerUnit * units) * 100);
    getListOfAllInvestorProjectIds();
  }, [])

  const getListOfAllInvestorProjectIds = async () => {
    const url = "investment/getAllInvestmentsByEmail/" + investor.user.userResponse.emailAddress;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + investor.access_token,
        },
      });
      console.log(response)
      if (response.status === 200) {
        const data = response.data;
        console.log(data)
        data.forEach(element => {
          projectIds.push(element.farmProjectId)
        });
        console.log(projectIds);
        setProjectHasBeenInvested(projectIds.includes(project.id));
      }
      else {
        console.log(response);
      }
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/login");
      }
      console.log(error.response);
    }
  }

  const config = {
    reference: (new Date()).getTime().toString(),
    email: investor.user.userResponse.emailAddress,
    amount: amount,
    publicKey: 'pk_test_df4962a615cd623dfe64e3038c7576e6783273a2'
  };

  const onSuccess = (reference) => {
    console.log(reference);
    createInvestment();
    location.reload();
  };

  const createInvestment = async () => {
    const url = "/investment/initiateInvestment";
    const request = {
      "investorId": investor.user.id,
      "farmProjectId": project.id,
      "amount": amount / 100,
      "InvestmentReturnType": "MONEY",
      "farmProjectName": project.farmProduceSummary,
      "roi": project.investmentPlan.roi,
      "startingDate": project.investmentPlan.startDate,
      "redemptionDate": project.investmentPlan.maturityDate
    };
    console.log(request);

    try {
      console.log(request);
      const response = await axios.post(url, request, {
        "headers": {
          "Authorization": 'Bearer ' + investor.access_token,
        },
      });
      if (response.status === 200) {
        setProjectHasNowBeenInvested(true);
        console.log(response);
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/login");
      }
      console.error(error);
      console.error("Error:", error.message);
    }
  };


  const onClose = () => {
    console.log('closed')
  }

  const handleChangeUnits = (event) => {
    const remainingUnit = project.investmentPlan.maximumNumberOfUnit - project.numberOfUnitInvestedSoFar;
    if (units == 0) {
      setToastResponse("Unit must be at least 1");
    }
    else if (units > remainingUnit) {
      setToastResponse("Only " + remainingUnit + "unit(s) is/are available.");
    }
    const value = event.target.value;
    setUnits(value);
    setAmount((project.investmentPlan.amountPerUnit * value) * 100);
  };

  const validateUnit = () => {
    const remainingUnit = project.investmentPlan.maximumNumberOfUnit - project.numberOfUnitInvestedSoFar;
    if (units == 0) {
      setToastResponse("Unit must be at least 1");
      showToast();
    }
    else if (units > remainingUnit) {
      setToastResponse("Only " + remainingUnit + "unit(s) is/are available.");
      showToast();
    } else {
      initializePayment(onSuccess, onClose)
    }
  }

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
                  <h3 className="text-3xl font-bold mb-4">{String(project.farmProduceSummary).toUpperCase()}</h3>
                  <div className="mb-2 text-xl">Status: {project.status}</div>
                  <div className="mb-2 text-xl">Location: {project.location}</div>
                  <div className="mb-2 text-xl">Unit price: #{project.investmentPlan.amountPerUnit}</div>
                  <div className="mb-2 text-xl">ROI: {project.investmentPlan.roi}%</div>
                  <div className="mb-2 text-xl">From: {getDate(project.investmentPlan.startDate)}</div>
                  <div className="mb-4 text-xl">To: {getDate(project.investmentPlan.maturityDate)}</div>
                  {
                    projectHasBeenInvested || projectHasNowBeenInvested ? (
                      <h3>Already invested</h3>
                    ) : (
                      <>
                        {project.status === "CLOSED" ?
                          (
                            <h3>Farm project is now unavailable</h3>
                          ) :
                          (
                            <div>
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
                                onClick={() => {
                                  validateUnit();
                                }}
                                disabled={projectHasBeenInvested}
                              >
                                Invest Now
                              </button>
                              <p>Only {project.investmentPlan.maximumNumberOfUnit - project.numberOfUnitInvestedSoFar} unit(s) is/are left.
                              </p>
                            </div>
                          )
                        }
                      </>
                    )
                  }

                </div>
              </div>
              <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Project Description:</h4>
                <p>{project.description}</p>
              </div>
            </div>
            <ToastContainer />
          </div>
        }
      />
    </>
  );
};

export default InvestorFarmProjectDetails;
