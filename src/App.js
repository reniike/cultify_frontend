import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/pages/authentication/login/components/Login.jsx';
import Otp from './pages/authentication/otp/components/Otp.jsx'
import InvestorRegistrationPage from './pages/authentication/registration/components/InvestorRegistrationPage.jsx'
import ErrorPage from './pages/utils/error/components/ErrorPage.jsx'
import InvestorFarmProjects from './pages/investor/farmProjects/components/InvestorFarmProjects.jsx'
import InvestorFarmProjectDetails from './pages/investor/farmProjectDetails/components/InvestorFarmProjectDetails.jsx'
import Home from './pages/homepage/components/Home.jsx'
import InvestorDashboard from './pages/investor/dashboard/components/InvestorDashboard.jsx'
import PaystackPayment from './pages/utils/paystack/PaystackPayment.jsx'
import CultifyTopNav from "./pages/utils/app/CultifyTopNav.jsx";
import PaymentTransfer from './pages/utils/paystack/PaystackTransfer.jsx'
import AdminDashboard from './pages/admin/components/adminDashboard/components/AdminDasboard.jsx'
import AdminRegistrationPage from './pages/authentication/registration/components/AdminRegistration.jsx'
import AdminFarmProjects from './pages/admin/components/adminFarmProjects/components/AdminFarmProjects.jsx'
import FarmProjectCreation from './pages/farmer/components/FarmProjectCreation.jsx'
import AdminFarmProjectDetails from "./pages/admin/components/adminFarmProjectDetails/components/AdminFarmProjectDetails.jsx";
import SuperAdminListing from './pages/superAdmin/components/SuperAdminListing.jsx'
import AdminInvitaion from './pages/admin/components/adminInvitation/components/AdmnInvitaion.jsx'
import InvestorInvestmentTable from './pages/investor/investmentTable/components/InvestorInvestmentTable.jsx'
import AdminInvestmentTable from './pages/admin/components/adminInvestmentTable/components/AdminInvestmentTable.jsx'
import InvestorListing from './pages/admin/components/investorListing/components/InvestorListing.jsx'
import FarmerListing from './pages/farmer/components/FarmerListing.jsx'
import FarmersRegistrationPage from "./pages/authentication/registration/components/farmersRegistration.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" Component={ErrorPage} />
        <Route path="/home" element={<Home />} />
         <Route path="/login" element={<Login />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/registration" element={<InvestorRegistrationPage />} />
        <Route path="/investor/dashboard" element={<InvestorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/investor/dashboard/projects/:id"
          element={<InvestorFarmProjectDetails />}
        />
        <Route
          path="/admin/dashboard/projects/:id"
          element={<AdminFarmProjectDetails />}
        />
        <Route
          path="/investor/dashboard/projects"
          element={<InvestorFarmProjects />}
        />
        <Route
          path="/investor/dashboard/investments"
          element={<InvestorInvestmentTable/>}
        />
        <Route
          path="/admin/registration/:email"
          element={<AdminRegistrationPage />}
        />
        <Route
          path="/admin/dashboard/investors"
          element={<InvestorListing />}
        />
        <Route
          path="/admin/dashboard/farmers"
          element={<FarmersRegistrationPage />}
        />

        <Route path="/paystackPayment" element={<PaystackPayment />} />
        <Route path="/paystackTransfer" element={<PaymentTransfer />} />
        <Route path="/topNav" element={<CultifyTopNav />} />
        <Route path="/admin/dashboard/projects" element={<AdminFarmProjects />}/>
        <Route path="/farmProjectCreation" element={<FarmProjectCreation />} />
        <Route path="/super-admin/administrators" element={<SuperAdminListing />} />
        <Route path="/adminInvitationPage" element={<AdminInvitaion />} />
        <Route
          path="/super-admin/dashboard/investments"
          element={<AdminInvestmentTable/>}
        />
      </Routes> 
    </Router>
  );
}
export default App;
