import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
import Login from './pages/login/components/login';
import Otp from './pages/dashboard/components/otp';
import InvestorRegistrationPage from './pages/dashboard/components/investorRegistrationPage';
import InvestorDashboard from './pages/dashboard/components/investorDashboard';
import ErrorPage from './pages/dashboard/components/errorPage';
import FarmProjectDetails from './pages/dashboard/components/farmProjectDetails';
import FarmProjects from './pages/dashboard/components/farmProjects';
import SuperAdminDashboardOptions from './pages/dashboard/components/superAdminDashboardOptions';
import Admins from './pages/dashboard/components/admins';
<<<<<<< HEAD
import NavBar from './pages/homepage/components/navBar';
import HeroSection from './pages/homepage/components/heroSection';
=======
import TopNavBar from './pages/dashboard/components/investorDash';
>>>>>>> 51e540cac27976dd0f2e4dc95596dc002fb6f933
import PaystackPayment from './pages/dashboard/components/paystackPayment';
import PaymentTransfer from './pages/dashboard/components/paystackTransfer';
import CultifyTopNav from "./pages/dashboard/components/cultifyTopNav";

function App() {
  return (
    <Router>
      <Routes>
          <Route path='*' Component={ErrorPage}/>
          <Route path='/home' element={<HeroSection/>}/>
          <Route path='/navbar' element={<NavBar/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/otp" element={<Otp/>}/>
          <Route path="/registration" element={<InvestorRegistrationPage/>} />
          <Route path="/investor/dashboard" element={<InvestorDashboard/>}/>
          <Route path="/investor/dashboard/produceDetails" element={<FarmProjectDetails/>}/>
          <Route path="/admin/dashboard/produceUpload" element={<FarmProjects/>}/>
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboardOptions/>}/>
          <Route path="/super-admin/dashboard/admins" element={<Admins/>}/>
          <Route path="/topNavBar" element={<TopNavBar/>}/>
          <Route path="/paystackPayment" element={<PaystackPayment/>}/>
          <Route path="/paystackTransfer" element={<PaymentTransfer/>}/>
          <Route path="/topNav" element={<CultifyTopNav />} />
      </Routes>
    </Router>

  )
}
export default App;
