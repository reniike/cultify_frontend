import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import AdminTopLeftNavBar from "./adminTopLeftNavBar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/axios";

const AdminInvitaion = () => {
  const [email, setEmail] = useState("");
  const [toastResponse, setToastResponse] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const admin = data.data;
  const leftBar = data.leftBar;

  const showToast = () => {
    toast(toastResponse, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/superAdmin/sendInvitationLink/" + email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setToastResponse(response.data.message);
        navigate("/admin/dashboard");
      } else {
        console.log("failed");
      }
    } catch (error) {
      let response = error.response.data;
      if (response === toastResponse) response = String(response).concat(" ");
      setToastResponse(response);
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (toastResponse) {
      showToast();
    }
  }, []);

  return (
    <div>
      <AdminTopLeftNavBar 
        data={admin}
        leftBar={leftBar}
        content={          
              <form className="mt-[130px]">
              <input
                type="text"
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="border border-custom-blue w-[550px] rounded mb-4 ml-[300px] py-2 pl-2"
              />
              <br />
              <button
                onClick={handleSubmit}
                className="bg-green-800 text-white text-[15px] w-50 p-1 rounded ml-[500px]"
              >
                Invite Admin
              </button>
              <ToastContainer />
            </form>
        }
      />
    </div>
  );
};

export default AdminInvitaion;
