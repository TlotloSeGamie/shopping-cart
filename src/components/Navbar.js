import React from "react";
import "./Navbar.css"

const NavBar = () => {
    return (
        <div className="navbar-container">
            <div className="logo">
                <h1>Shopping List</h1>
            </div>
            <a href="#" className="login-link" >
            <i class="ri-account-circle-line"></i>Login
          </a>
          <a href="#" className="login-link" >
            <i class="ri-account-circle-line"></i>Register
          </a>
        </div>
    )
};

export default NavBar;