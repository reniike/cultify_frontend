import axios from '../../../../api/axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CultifyTopNav from '../../../utils/app/CultifyTopNav';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        if (email.trim() !== '') {
            axios
                .post('/user/sendResetPasswordLink/' + email)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('Password reset link sent to your email.');
                    }
                })
                .catch((error) => {
                    toast.error('An error occurred. Please try again later.');
                });
        } else {
            toast.error('Please enter a valid email.');
        }
    };

    return (
        <CultifyTopNav content={
            <div className='h-[520px] w-[500px] bg-slate-50 ml-[32%] mt-7 border rounded-lg'>
                <div className='text-3xl mt-[15%] ml-[25%] text-custom-green'>
                    <h1 className='font-semibold mb-10'>Forgot Password</h1>
                </div>
                <div className='ml-7 mb-6'>
                    <p>Enter your account email below, and we'll send a reset link</p>
                </div>

                <div className='ml-7 mb-3'>
                    <p>Enter your email address</p>
                </div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className='h-[60px] w-[380px] rounded-md border-[2px] border-custom-green ml-7'
                />
                <button onClick={handleResetPassword} className=" text-white rounded-lg border-solid border-[2px] bg-custom-green h-[50px] w-[200px] mt-7 ml-[29%] px-4 py-2 max-w-xs transition duration-300 ease-in-out hover:scale-110
                        hover:bg-custom-green hover:text-white hover:border-0">Continue</button>
                <ToastContainer />
            </div>
        } />

    );
};

export default ForgotPassword;
