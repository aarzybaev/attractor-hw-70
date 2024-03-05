import React from 'react';
import {NavLink} from 'react-router-dom';
const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">HW-70</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Contacts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/new-contact">Add new contact</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;