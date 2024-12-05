import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaUserCircle, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'; 
import Profile from './Profile';
import "./Navbar.css";
import PrivacyPolicy from "./PrivacyPolicy";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const navigate = useNavigate(); 

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
        setIsProfileModalOpen(false);
        navigate('/'); 
    };

    const toggleProfileModal = () => {
        setIsProfileModalOpen(!isProfileModalOpen);
    };

    return (
        <div className="navbar-container">
            <div className="logo">
                <h1>Shopping List</h1>
            </div>
            <div className="logins">
                {isLoggedIn ? (
                    <>
                        <span className="username" onClick={toggleProfileModal}> 
                            <FaUserCircle size={60} /> {username} 
                        </span>
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

            {isProfileModalOpen && (
                <div className="profile-modal-overlay" onClick={toggleProfileModal}>
                    <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
                        <Profile />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
