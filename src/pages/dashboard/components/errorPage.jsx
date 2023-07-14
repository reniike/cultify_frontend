import '../styles/errorPage.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/home")
  }, [])
  
  return(
    <>
    </>
  );
}

export default ErrorPage;
