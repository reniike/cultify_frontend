import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
import Login from "./pages/login/components/login";
import Otp from "./pages/dashboard/components/otp";
import InvestorRegistrationPage from "./pages/dashboard/components/investorRegistrationPage";
import InvestorDashboard from "./pages/dashboard/components/investorDashboard";
import ErrorPage from "./pages/dashboard/components/errorPage";
import FarmProjectDetails from "./pages/dashboard/components/farmProjectDetails";
import FarmProjects from "./pages/dashboard/components/farmProjects";
import SuperAdminDashboardOptions from "./pages/dashboard/components/superAdminDashboardOptions";
import Admins from "./pages/dashboard/components/admins";
import CultifyTopNav from "./pages/dashboard/components/cultifyTopNav";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="*" Component={ErrorPage} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/registration" element={<InvestorRegistrationPage />} />
          <Route path="/investor/dashboard" element={<InvestorDashboard />} />
          <Route
            path="/investor/dashboard/produceDetails"
            element={<FarmProjectDetails />}
          />
          <Route
            path="/admin/dashboard/produceUpload"
            element={<FarmProjects />}
          />
          <Route
            path="/super-admin/dashboard"
            element={<SuperAdminDashboardOptions />}
          />
          <Route path="/super-admin/dashboard/admins" element={<Admins />} />
          <Route path="/topNav" element={<CultifyTopNav />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
