import {React} from 'react';
import { Link } from 'react-router-dom';
import '../styles/topNav.css';

export default function TopNav({links}) {
    return(        
      <nav className="investor-top-nav">
      <h1 className="logo">Cultify</h1>
      <ul className="nav-links">
        {
          links.map((link, index) => (
            <li key={index}>
              <Link to={link.url}>{link.name}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
    )
}