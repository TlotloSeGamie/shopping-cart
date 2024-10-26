import React, { useState } from "react";
import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "JohnDoe",
    email: "john.doe@example.com",
    profileImage: null, // To store the uploaded profile image
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

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

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {userData.profileImage ? (
        <img src={userData.profileImage} alt="Profile" className="profile-image" />
      ) : (
        <FaUserCircle size={90} />
      )}
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
            />
          </label>
          <label>
            Profile Image:
            <input
              type="file"
            //   accept="image/*"
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
