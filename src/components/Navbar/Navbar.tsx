import React from 'react';
import {NavLink} from 'react-router-dom';
const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand"><NavLink className="nav-link" to="/">TV shows</NavLink></span>
        <div className="collapse navbar-collapse">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;