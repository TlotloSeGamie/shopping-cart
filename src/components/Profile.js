import React, { useState, useRef, useEffect } from "react";
import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profileImage: null, // To store the uploaded profile image
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const fileInputRef = useRef(null); // Reference to hidden file input

  useEffect(() => {
    // Fetch the logged-in user's data from localStorage
    const currentUserEmail = localStorage.getItem('currentUser');
    if (currentUserEmail) {
      const storedUser = JSON.parse(localStorage.getItem('users'))[currentUserEmail];
      if (storedUser) {
        setUserData(storedUser);
        setFormData(storedUser);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profileImage: reader.result });
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger the file input on icon click
  };

  const handleSave = () => {
    setUserData(formData);
    // Update the user data in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
    existingUsers[formData.email] = { ...formData, profileImage: userData.profileImage };
    localStorage.setItem('users', JSON.stringify(existingUsers));
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {userData.profileImage ? (
        <img
          src={userData.profileImage}
          alt="Profile"
          className="profile-image"
          onClick={handleIconClick} // Trigger file upload on image click
        />
      ) : (
        <FaUserCircle size={90} onClick={handleIconClick} className="clickable-icon" />
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {isEditing ? (
        <div className="edit-form">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled // Disable editing email to avoid accidental changes
            />
          </label>
          <label>
            Profile Image:
            <input
              type="file"
              onChange={handleFileChange}
            />
          </label>
          <button onClick={handleSave} className="btn">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn cancel">Cancel</button>
        </div>
      ) : (
        <div className="profile-details">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <button onClick={() => setIsEditing(true)} className="btn">Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
