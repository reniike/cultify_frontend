import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
import Login from "./pages/login/components/login";
import Otp from "./pages/dashboard/components/otp";
import InvestorRegistrationPage from "./pages/dashboard/components/investorRegistrationPage";
import ErrorPage from "./pages/dashboard/components/errorPage";
import InvestorFarmProjectDetails from "./pages/dashboard/components/investorFarmProjectDetails";
import InvestorFarmProjects from "./pages/dashboard/components/investorFarmProjects";
import HeroSection from "./pages/homepage/components/heroSection";
import InvestorDashboard from "./pages/dashboard/components/investorDashboard";
import PaystackPayment from "./pages/dashboard/components/paystackPayment";
import PaymentTransfer from "./pages/dashboard/components/paystackTransfer";
import CultifyTopNav from "./pages/dashboard/components/cultifyTopNav";
import AdminDashboard from "./pages/dashboard/components/adminDasboard";
import AdminRegistrationPage from "./pages/dashboard/components/adminRegistration";
import AdminFarmProjects from "./pages/dashboard/components/adminFarmProjects";
import FarmProjectCreation from "./pages/dashboard/components/farmProjectCreation";
import AdminFarmProjectDetails from "./pages/dashboard/components/adminFarmProjectDetails";
import SuperAdminListing from "./pages/dashboard/components/superAdminListing";
import AdminInvitaion from "./pages/dashboard/components/admnInvitaion";
import InvestorInvestmentTable from "./pages/dashboard/components/investorInvestmentTable";
import AdminInvestmentTable from "./pages/dashboard/components/adminInvestmentTable";
import InvestorListing from "./pages/dashboard/components/investorListing";
import FarmerListing from "./pages/dashboard/components/farmerListing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" Component={ErrorPage} />
        <Route path="/home" element={<HeroSection />} />
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
          element={<FarmerListing />}
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
