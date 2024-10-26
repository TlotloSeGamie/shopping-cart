import React, { useState, useEffect } from "react";
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'; // Importing icons from react-icons
import "./Navbar.css";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const { username } = JSON.parse(userData);
            setUsername(username);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <div className="navbar-container">
            <div className="logo">
                <h1>Shopping List</h1>
            </div>
            <div className="logins">
                {isLoggedIn ? (
                    <>  
                        {/* <FaUser/> */}
                        <span className="username"> <FaUserCircle  size={60}/>{username}</span>
                        <button onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <a href="/login" className="login-link">
                            <FaSignInAlt /> Login
                        </a>
                        <a href="/register" className="login-link">
                            <FaUserPlus /> Register
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
