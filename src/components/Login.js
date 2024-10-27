import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import "./Login.css";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const currentUserEmail = localStorage.getItem('currentUser');
    if (currentUserEmail) {
        const savedItems = JSON.parse(localStorage.getItem(`items_${currentUserEmail}`));
        if (savedItems) {
            dispatch({ type: 'categories/loadItems', payload: savedItems });
        }
    }
}, [dispatch]);

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

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password should be at least 8 characters";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Fetch the user data from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
    const storedUser = existingUsers[formData.email];

    if (storedUser && storedUser.password === formData.password) {
        localStorage.setItem('currentUser', formData.email); // Save the logged-in user’s email in `currentUser`
        onLogin(storedUser);
        navigate('/itemform');
    } else {
        setErrors({ form: 'Invalid email or password' });
    }
};

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="main-form-container">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')} className="nav-btn">Home</button>
        <button onClick={() => navigate(-1)} className="nav-btn">Back</button>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <h4>Sign In</h4>
        {errors.form && <span>{errors.form}</span>}

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

        <div className="logs">
          <button type="submit" className="btn">Login</button>
          <a href="/register" className="registers-link">
            Don't have an account? Register here.
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
