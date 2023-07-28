import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CultifyTopNav from '../../../utils/app/CultifyTopNav';
import axios from '../../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { encryptedEmail } = useParams();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [toastResponse, setToastResponse] = useState("");

    console.log(encryptedEmail);

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

    const isValidPassword = (password) => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordUpdate = (e) => {
        const formErrors = {};
        e.preventDefault();

        if (!password) {
            formErrors.password = "*Password is required";
        } else if (!isValidPassword(password)) {
            formErrors.password =
                "*Password must be 8-24 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character";
        }
        if (!confirmPassword) {
            formErrors.confirmPassword = "*Confirm password is required";
        } else if (password !== confirmPassword) {
            formErrors.confirmPassword = "*Passwords do not match";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setIsLoading(true);
            updatePassword();
        }

    };

    const updatePassword = async () => {

        const resetPasswordRequest = {
            email: encryptedEmail,
            password: password,
        };



        try {
            const response = await axios.post('/user/updatePassword/', resetPasswordRequest);
            console.log(response.data);
            setToastResponse(response.data.message);
        } catch (error) {
            setIsLoading(false);
            let response = error.response.data;
            if (response === toastResponse) response = String(response).concat(" ");
            setToastResponse(response);
            console.log(error.response.data);
        }

    }


    useEffect(() => {
        if (toastResponse) {
            showToast();
        }
    }, [toastResponse]);



    return (
        <CultifyTopNav
            content={
                <div className='h-[540px] w-[500px] bg-slate-50 ml-[32%] mt-3 border rounded-lg'>
                    <div className='text-3xl mt-[10%] ml-[25%] text-custom-green'>
                        <h1 className='font-semibold mb-[10%]'>Reset Password</h1>
                    </div>
                    <div className='ml-[13%]'>
                        <p>Enter new password</p>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className={`h-[60px] w-[380px] rounded-md border-[2px] border-custom-green ml-[13%] mb-4 ${errors.password ? "input-error" : ""}`}
                    />
                    <p className="error ml-[13%] mb-3">{errors.password}</p>
                    <br />
                    <div className='ml-[13%]'>
                        <p>Confirm new password</p>
                    </div>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className={`h-[60px] w-[380px] rounded-md border-[2px] border-custom-green ml-[13%] ${errors.confirmPassword ? "input-error" : ""}`}
                    />
                    {errors.confirmPassword && (
                        <p className="error ml-[13%]">{errors.confirmPassword}</p>
                    )}
                    <br />
                    <button onClick={handlePasswordUpdate} className=" text-white rounded-lg border-solid border-[2px] bg-custom-green h-[50px] w-[200px] mt-2 ml-[29%] px-4 py-2 max-w-xs transition duration-300 ease-in-out hover:scale-110
                        hover:bg-custom-green hover:text-white hover:border-0">
                        Reset password
                    </button>
                    <ToastContainer />
                </div>
            }
        />
    );
};

export default ResetPassword;
