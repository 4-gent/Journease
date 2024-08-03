// OAuth2Example.js
import React, { useEffect } from 'react';

const OAuth2Example = () => {
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
              // Add logic to handle the token
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
  }, []);

  return (
    <div>
      <h1>OAuth2 Example</h1>
      <button id="authButton">Authenticate</button>
    </div>
  );
};

export default OAuth2Example;
