import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";
import NavBar from "./Navbar";

function Home() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleGetStartedClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <NavBar />
      <div className="main">
        <div className="home-container">
          <div className="hero">
            <h1>Welcome to <span>Shopping List</span></h1>
            <p>
              Manage your shopping efficiently with <span>ShoppingList</span> – your ultimate tool for organizing and prioritizing your shopping items!
            </p>
            <button className="get-started-btn" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <div className="features">
            <h2>Why Choose Us?</h2>
            <ul>
              <li>Add items to your shopping list easily</li>
              <li>Remove items when they're no longer needed</li>
              <li>Track what you need to buy seamlessly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
