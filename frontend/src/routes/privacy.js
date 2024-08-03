import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Privacy() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [showSignOut, setShowSignOut] = useState(false);

  const handleSignOut = () => {
    // Clear user information and access token from localStorage
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');

    // Redirect to the login page or home page
    navigate('/');
  };

  return (
    <div>
      Privacy Settings Page

      {userInfo ? (
        <div>
          <h2>User Information</h2>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Access Token:</strong> {accessToken}</p>
          <div className="profile-container" onClick={() => setShowSignOut(!showSignOut)}>
            <img src={userInfo.picture} alt="Profile" className="profile-picture" />
            {showSignOut && (
                <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
            )}
        </div>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
}
