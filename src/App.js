import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
import Login from "./pages/login/components/login";
import Otp from "./pages/dashboard/components/otp";
import InvestorRegistrationPage from "./pages/dashboard/components/investorRegistrationPage";
import ErrorPage from "./pages/dashboard/components/errorPage";
import FarmProjectDetails from "./pages/dashboard/components/farmProjectDetails";
import InvestorFarmProjects from "./pages/dashboard/components/investorFarmProjects";
import SuperAdminDashboardOptions from "./pages/dashboard/components/superAdminDashboardOptions";
import HeroSection from "./pages/homepage/components/heroSection";
import InvestorDashboard from "./pages/dashboard/components/investorDashboard";
import PaystackPayment from "./pages/dashboard/components/paystackPayment";
import PaymentTransfer from "./pages/dashboard/components/paystackTransfer";
import CultifyTopNav from "./pages/dashboard/components/cultifyTopNav";
import AdminDashboard from "./pages/dashboard/components/adminDasboard";
import AdminRegistrationPage from "./pages/dashboard/components/adminRegistration";
import AdminFarmProjects from "./pages/dashboard/components/adminFarmProjects";
import FarmProjectsReequest from "./pages/dashboard/components/farmProjectsReequest";

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
          element={<FarmProjectDetails />}
        />
        <Route
          path="/investor/dashboard/projects"
          element={<InvestorFarmProjects />}
        />
        <Route
          path="/admin/registration/:email"
          element={<AdminRegistrationPage />}
        />
        <Route
          path="/super-admin/dashboard"
          element={<SuperAdminDashboardOptions />}
        />
        <Route path="/paystackPayment" element={<PaystackPayment />} />
        <Route path="/paystackTransfer" element={<PaymentTransfer />} />
        <Route path="/topNav" element={<CultifyTopNav />} />
        <Route path="/adminfarmprojects" element={<AdminFarmProjects />} />
        <Route path="/farmprojectsrequest" element={<FarmProjectsReequest />} />
      </Routes>
    </Router>
  );
}
export default App;
