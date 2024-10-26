import React from "react";
import "./Navbar.css";

const NavBar = () => {
    return (
        <div className="navbar-container">
            <div className="logo">
                <h1>Shopping List</h1>
            </div>
            <div className="logins">
              <a href="#" className="login-link">
                  <i className="ri-account-circle-line"></i>Login
              </a>
              <a href="#" className="login-link">
                  <i className="ri-account-circle-line"></i>Register
              </a>
            </div>
        </div>
    );
};

export default NavBar;
