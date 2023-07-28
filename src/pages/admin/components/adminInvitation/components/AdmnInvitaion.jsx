import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import AdminTopLeftNavBar from "../../adminTopLeftNavBar/components/AdminTopLeftNavBar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../../../api/axios";
import '../../../styles/submitButton.css'

const AdminInvitaion = () => {
  const [email, setEmail] = useState("");
  const [toastResponse, setToastResponse] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const admin = data.data;
  const leftBar = data.leftBar;
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);


  useEffect(() => {
    if (data == null || data === undefined) {
      navigate("/login")
    }
  }, []);

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

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formErrors = {};
    if (!isValidEmail(email)) {
      formErrors.email = "*Invalid email address i.e example@gmail.com";
      setErrors(formErrors)
      setIsLoading(false);
      return;
    }

    try {
      console.log(admin.access_token);
      const response = await axios.post(
        "/superAdmin/sendInvitationLink/" + email, "",
        {
          "headers": {
            "Authorization": "Bearer " + admin.access_token,
          },
        }
      );

      if (response.status == 200) {
        let message = response.data.message;
        if (message === toastResponse) message = String(response).concat(" ");
        setToastResponse(message);
        setTimeout(navigate("/super-admin/administrators", { state: { "data": admin, "leftBar": leftBar } }), 3000);
      } else {
        console.log("failed");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      let response = error.response.data;
      const status = error.response.status;
      if (status == 400) {
        if (response === toastResponse) response = String(response).concat(" ");
        setToastResponse(response);
        console.log(response);
        console.log(status);
      }
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (toastResponse) {
      showToast();
    }
  }, [toastResponse]);

  return (
    <div>
      <AdminTopLeftNavBar
        navIndex={5}
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
            {errors.email && <p className="text-red-500 text-sm ml-80">{errors.email}</p>}
            <br />
            <button
              type="submit"
              className={`btn-submit ml-[44%] w-40 ${isLoading ? "loading" : "bg-green-800 text-white text-[15px] w-50 p-1 rounded ml-[500px]"}`}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <div className="loading-indicator w-[20px]"></div> : "Invite"}
            </button>
            <ToastContainer />
          </form>
        }
      />
    </div>
  );
};

export default AdminInvitaion;
