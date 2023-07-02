import {React, useState}from 'react';
import Modal from 'react-modal';

const Otp = () => {
    const[otp, setOtp] = useState ("")
    const[openModal, setOpenModal] = useState(false)
    const[otpVerificationtionStatus, setOtpVerificationtionStatus] = useState("")

    const modalIsOpen = (event) =>{
        setOpenModal(true)
    }
    const modalIsClose = (event) =>{
        setOpenModal(false)
        setOtp("")
        setOtpVerificationtionStatus("")
    }
    const handleOtp = (event) => {
        setOtp(event.target.value)
    }
    const handleOtpSubmit = (event) =>{
        event.preventDefault();

        const genetatedOtp = "12345"
        if(otp === genetatedOtp){
            setOtpVerificationtionStatus("Verified")
        }else
        setOtpVerificationtionStatus("Wrong Otp! Try again")
    }

    return(
        <div className='otp'>
            
            <Modal isOpen={modalIsOpen} onRequestClose={modalIsClose}>
                <h2>Enter OTP</h2>
                <form onSubmit={handleOtpSubmit}>
                <input type="text" value={otp} onChange={handleOtp} placeholder="Enter OTP"
                />
                <button type="submit">Submit</button>
                <button onClick={modalIsClose}>Close</button>
                </form>
                {otpVerificationtionStatus && <p>{otpVerificationtionStatus}</p>}
            </Modal>
        </div>
    )
}
export default Otp;

