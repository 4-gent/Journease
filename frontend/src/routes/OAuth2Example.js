import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Example = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGoogleClient = () => {
      if (typeof window.google !== 'undefined' && window.google.accounts && window.google.accounts.oauth2) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: '858097161571-jcbqvah8djskts47h0qabraedtnb46v6.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/documents.readonly https://www.googleapis.com/auth/photoslibrary.readonly',
          callback: (tokenResponse) => {
            console.log('Token Response:', tokenResponse);
            if (tokenResponse && tokenResponse.access_token) {
              console.log('Access Token:', tokenResponse.access_token);
              setIsAuthenticated(true);
              fetchUserInfo(tokenResponse.access_token);
            }
          },
          error: (error) => {
            console.error('Token client error:', error);
          }
        });

        document.getElementById('authButton').addEventListener('click', () => {
          client.requestAccessToken();
        });
      } else {
        console.error('Google API client is not loaded.');
      }
    };

    const fetchUserInfo = async (accessToken) => {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data)); // Store user info in local storage
        navigate('/privacy'); // Redirect to /privacy
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    // Load the Google API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = loadGoogleClient;
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  return (
    <div>
      <h1>OAuth2 Example</h1>
      {isAuthenticated ? (
        <div>
          <h2>Logged In</h2>
          {userInfo && (
            <div>
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <img src={userInfo.picture} alt="Profile" width="100" />
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Please authenticate to access your information.</p>
          <button id="authButton">Authenticate</button>
        </div>
      )}
    </div>
  );
};

export default OAuth2Example;
