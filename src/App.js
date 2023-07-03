import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import './App.css';
import Login from './pages/login/components/login';
import Otp from './pages/dashboard/components/otp';
import RegistrationPage from './pages/dashboard/components/registrationPage';
import ConsumerDashboard from './pages/dashboard/components/consumerDashboard';
import ErrorPage from './pages/dashboard/components/errorPage';
import ProduceDetails from './pages/dashboard/components/produceDetails';
import UploadFarmProducePage from './pages/dashboard/components/farmerStockUploading';

function App() {
  return (
    <div className='app'>
    <Router>
      <Routes>
          <Route path='*' Component={ErrorPage}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/otp" element={<Otp/>}/>
          <Route path="/registration" element={<RegistrationPage/>} />
          <Route path="/investor/dashboard" element={<ConsumerDashboard/>}/>
          <Route path="/investor/dashboard/produceDetails" element={<ProduceDetails/>}/>
          <Route path="/admin/dashboard/produceUpload" element={<UploadFarmProducePage/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
