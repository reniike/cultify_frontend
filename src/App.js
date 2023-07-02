import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Otp from './components/otp';
import Welcome from './components/welcome';
import './components/welcome.css'
import Farmer from './components/Farmer';
import Customer from './components/Customer';
import Transporter from './components/Transporter';

function App() {
  return (
    <div className='app'>
    <Router>
      <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/otp" element={<Otp/>}></Route>
          <Route path="/" element={<Welcome/>}></Route>
          
          <Route path="/customer/registration" element={<Customer />} />
          <Route path="/farmer/registration" element={<Farmer />} />
          <Route path="/transporter/registration" element={<Transporter />} />
      
      </Routes>
    </Router>
    </div>
  );
}

export default App;
