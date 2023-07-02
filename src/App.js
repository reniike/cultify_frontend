
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/login/components/Login';
import Otp from './pages/registration/components/otp';
import RegistrationRouter from './pages/registration/components/registrationRouter';
import ConsumerRegistration from './pages/registration/components/consumerRegistration';
import FarmerRegistration from './pages/registration/components/FarmerRegistration';
import TransporterRegistration from './pages/registration/components/transporterRegistration';

function App() {
  return (
    <div className='app'>
    <Router>
      <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/otp" element={<Otp/>}/>
          <Route path="/registration" element={<RegistrationRouter/>}/>
          
          <Route path="/registration/consumer" element={<ConsumerRegistration />} />
          <Route path="/registration/farmer" element={<FarmerRegistration />} />
          <Route path="/registration/transporter" element={<TransporterRegistration />} />
      
      </Routes>
    </Router>
    </div>

  );
}

export default App;
