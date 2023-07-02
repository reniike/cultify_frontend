import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <header>
      <div>
        <Link className="cultify">
          {/* <img src="#" alt="Cultify logo" /> */}
          <span>Cultify</span>
        </Link>
      </div>

      <div>
        <NavLink className="nav">
          <Link to="/" className="link" end>
            Consumer
          </Link>
          <Link to="/" className="link">
            Farmer
          </Link>
          <Link to="/" className="link">
            Transporter
          </Link>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
