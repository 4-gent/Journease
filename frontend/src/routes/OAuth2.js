// Main incentive in using OAuth2 https://auth0.com/blog/why-migrate-from-api-keys-to-oauth2-access-tokens/

// Importing libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Creating a function call for authentication
const OAuth2Example = () => {
  // Use states to ensure LOCAL data is stored
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // Navigation tool to go to Privacy page
  const navigate = useNavigate();

  // Takes the client_id and starts an OAuth2 session, if properly authenticated, then the user will be redirected
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
    
    // Access Token is provided after authentication, GOOD security practice
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
        localStorage.setItem('accessToken', accessToken); // Store user info in local storage
        navigate('/privacy'); // Redirect to /privacy
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    // Loads Google API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = loadGoogleClient;
    document.body.appendChild(script);

    // Cleans up the scripts
    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  // CHANGE THIS to fix the UI, currently not the greatest
  return (
    <div>
      <h1>OAuth2 Example</h1>
        <div>
          <p>Please authenticate to access your information.</p>
          <button id="authButton">Authenticate</button>
        </div>
      
    </div>
  );
};

export default OAuth2Example;
