import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email address.";
    
    if (!password) newErrors.password = "Password is required.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords must match.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Save the user in localStorage
      const user = { username, email, password };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/login'); // Redirect to login page after successful registration
    }
  };

  return (
    <div className="main-form-container">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')} className="nav-btn">Home</button>
        <button onClick={() => navigate(-1)} className="nav-btn">Back</button>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <h4>Register</h4>
        {errors.form && <span>{errors.form}</span>}

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <span>{errors.username}</span>}

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span>{errors.email}</span>}

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={toggleShowPassword} className="show-hide-btn">
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        {errors.password && <span>{errors.password}</span>}

        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span onClick={toggleShowConfirmPassword} className="show-hide-btn">
            {showConfirmPassword ? "Hide" : "Show"}
          </span>
        </div>
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

        <div className="logs">
          <button type="submit" className="btn">Register</button>
          <a href="/login" className="registers-link">
            Already have an account? Login here.
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
