import {React} from 'react';
import { Link } from 'react-router-dom';
import '../styles/consumerDashboard.css';

export default function ConsumerTopNav() {
    return(        
      <nav className="top-nav">
      <h1 className="logo">Cultify</h1>
      <ul className="nav-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
    )
}