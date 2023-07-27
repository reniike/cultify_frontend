import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../../api/axios";
import { React, useEffect, useState } from "react";

const EmailVerification = ()=>{
    const {encryptedEmail} = useParams();
    const navigate = useNavigate();
    console.log(encryptedEmail);

    useEffect(()=>{
        registerInvestor();
    }, [])
    
    const registerInvestor = async () => {
        const request = {
            emailAddress: encryptedEmail,
        };
        try {
            const response = await axios.post("/investor/completeRegistration", request);
            if (response.status == 200) {
                const data = response.data;
                console.log(data);
                navigate("/investor/dashboard", {state: data});            
            }
            console.log(response);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return(
        <div></div>
    )
}

export default EmailVerification;