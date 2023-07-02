import "./App.css";
import FarmerRistration from "./pages/dashboard/components/FarmerRegistration";
import Header from "./pages/dashboard/components/Header";
import TransporterRistration from "./pages/dashboard/components/TransporterRegistration";
import Register from "./pages/dashboard/components/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/farmer" element={<FarmerRistration />} />
        <Route path="/transporter" element={<TransporterRistration />} />
      </Routes>
    </div>
  );
}

export default App;
