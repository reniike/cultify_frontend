import '../styles/errorPage.css';
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  console.log("Hello");
  routeToHomePage();

  function routeToHomePage(){
    navigate("/home");
  }
}

export default ErrorPage;
