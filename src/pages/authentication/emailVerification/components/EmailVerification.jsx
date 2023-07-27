import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../../api/axios";
import { React, useEffect, useState } from "react";
import CultifyModal from "../../otp/components/Otp";

const EmailVerification = ()=>{
    const {encryptedEmail} = useParams();
    const navigate = useNavigate();
    const [modalIsDisplayed, setModalIsDisplayed] = useState(false);
    const [dot, setDot] = useState("");

    useEffect(()=>{
        const load = ()=> {        
            if(dot == "...")setDot("");
            else setDot(dot+".");
        }
        const interval = setInterval(load, 1000);
        return () => {
            clearInterval(interval);
          };
    }, [dot])

    
    useEffect(()=>{
        setModalIsDisplayed(true);
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
                setModalIsDisplayed(false);
                navigate("/investor/dashboard", {state: data});            
            }
            console.log(response);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return(
        <>
            <CultifyModal
                text={"Please wait while your email is being verified"+dot}
                isDisplayed={modalIsDisplayed}
            />
        </>
    )
}

export default EmailVerification;