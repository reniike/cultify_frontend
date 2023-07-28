import { React, useState } from "react";
import CultifyTopNav from '../../../utils/app/CultifyTopNav';
import "../styles/login.css";
import axios from "../../../../api/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [toastResponse, setToastResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showToast = () => {
    toast("Invalid email or password", {
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

  const handChangeEmail = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    authenticate();
  };

  const handleForgotPassword = () => {
    navigate('/forgotPassword')
  }

  const authenticate = async () => {
    const request = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("/login", request);
      const data = response.data;
      console.log(data);
      const role = data.user.userResponse.roles[0];
      if (role === "INVESTOR") navigate("/investor/dashboard", { state: data });
      else if (role === "ORDINARY_ADMIN") navigate("/admin/dashboard", { state: { "data": data, "leftBar": ["Dashboard", "Farm Projects", "Investments", "Investors", "Farmers", "Profile"] } });
      else navigate("/admin/dashboard", { state: { "data": data, "leftBar": ["Dashboard", "Farm Projects", "Investments", "Investors", "Farmers", "System Administrators", "Profile"] } });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.response.status === 403) {
        if (toastResponse) setToastResponse(String(toastResponse).concat(" "));
        showToast();
      }
    }

  }

  return (
    <CultifyTopNav
      content={
        <div className="login-page mt-6">
          <div className="sign-in">
            <div>
              <p>
                Welcome to <span>Cultify</span>
              </p>
              <h4 className='font-bold text-3xl mt-3'>Sign in</h4>
            </div>
            <div className="account">
              <p>No account ?</p>
              <>
                <span onClick={() => {
                  navigate("/registration")
                }}>Sign up</span>
              </>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="email">
              <label htmlFor="email">Enter your email address</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handChangeEmail}
                placeholder="example@gmail.com"
              />
            </div>
            <div className="password">
              <label htmlFor="password">Enter your password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="Enter your password"
              ></input>
            </div>
          </form>
          <a href="#" onClick={handleForgotPassword} >Forgot password</a>
          <button
            type="submit"
            className={`btn-submit ${isLoading ? "loading" : ""}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <div className="loading-indicator"></div> : "Sign in"}
          </button>
          <ToastContainer />
        </div>
      }
    />
  );
};

export default Login;
