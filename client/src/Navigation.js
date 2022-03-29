import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/"  className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/download"  className="nav-link">
              Download File
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
