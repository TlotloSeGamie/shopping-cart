import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Register() {
  const [formData, setFormData] = useState({
    username: '',  // Added username field
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.username.trim()) { // Validate username
      validationErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password should be at least 8 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Save registration data to localStorage
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,  // Save username to localStorage
        email: formData.email,
        password: formData.password,
      }));
      alert("Registration successful! Please log in.");
      navigate('/login'); // Navigate to login page after registration
    } catch (error) {
      setErrors({ form: 'Registration error' });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
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

        <label htmlFor="username"><b>Username</b></label> {/* New Username Label */}
        <input
          type="text"
          placeholder="Username"  // Placeholder for Username
          name="username"  // Name for Username input
          value={formData.username}  // State for Username
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>} {/* Error message for Username */}

        <label htmlFor="email"><b>Email</b></label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}

        <label htmlFor="password"><b>Password</b></label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            onClick={toggleShowPassword}
            className="show-hide-btn"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        {errors.password && <span>{errors.password}</span>}

        <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span
            onClick={toggleShowConfirmPassword}
            className="show-hide-btn"
          >
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
