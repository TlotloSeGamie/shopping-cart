import React from "react";
import "./Navbar.css"

const Navbar = () => {
    return(
        <div className="navbar-container">
            <div className="logo">
                <h1>Shopping List</h1>
                <a href="#" className="login-link">
                <i class="ri-account-circle-fill"></i>Login
                </a>
            </div>
        </div>
    );
};

export default Navbar;