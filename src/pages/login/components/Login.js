import {React, useState}from 'react';
import Modal from 'react-modal';

const Login = () => {
    const[email, setUsername] = useState("")
    const[password, setPassword] = useState("")
    


    const handChangeEmail =(event)=>{
        setUsername(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        if (email === "email" && password === "password"){
            console.log("Successful")
        }else
        console.log("Invalid Email or Password")
    }

    
    return (
        <div> 
        <div className='login-page'> 
            <h2>  Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" ></label>
                    <input type='text' id='email' value={email} onChange={handChangeEmail} placeholder="Enter E-mail"/>
                </div>
                <div>
                    <label htmlFor="password" ></label>
                    <input type="text" id='password' value={password} onChange={handleChangePassword} placeholder="Enter Password"></input>
                </div>
            </form> 
            <button onClick={handleSubmit}>Login</button>
            <h5>Don't have an account Yet? </h5>
            <a href="#">Sign in</a> 
        </div>
    </div>  
        
    );
};


export default Login;