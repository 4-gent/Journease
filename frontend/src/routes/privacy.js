import React, { useState } from 'react';
import '../public/privacy.css';
import Dashboard from './dashboard.js';
// This contains the use states, given by the user!

// List of imported libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//
export default function Privacy() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const accessToken = localStorage.getItem('accessToken');
  // Allows for redirection back to OAuth2 or the dashboard
  const navigate = useNavigate();
  const [showSignOut, setShowSignOut] = useState(false);
  const [events, setEvents] = useState([]);

    const handleToggleChange = (e) => {
        const { name, checked } = e.target;
        setPrivacySettings(prevSettings => ({
            ...prevSettings,
            [name]: checked
        }));
        localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected Privacy Options:', privacySettings);
        setShowUserInfo(true); // Show user info after submission
        localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
    };

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const accessToken = localStorage.getItem('accessToken');

    return (
        <div>
            {showUserInfo && userInfo ? (
                <Dashboard />
            ):(
                <div className="privacy-container">
                    <h1>Privacy Settings</h1>
                    <form onSubmit={handleSubmit} className="privacy-form">
                        <div className="switch">
                            <input
                                type="checkbox"
                                id="cookies"
                                name="cookies"
                                checked={privacySettings.cookies}
                                onChange={handleToggleChange}
                            />
                            <label htmlFor="cookies">
                                <span className="slider"></span>
                                Allow Cookies
                            </label>
                        </div>
                        <div className="switch">
                            <input
                                type="checkbox"
                                id="email"
                                name="email"
                                checked={privacySettings.email}
                                onChange={handleToggleChange}
                            />
                            <label htmlFor="email">
                                <span className="slider"></span>
                                Allow Email Access
                            </label>
                        </div>
                        <div className="switch">
                            <input
                                type="checkbox"
                                id="history"
                                name="history"
                                checked={privacySettings.history}
                                onChange={handleToggleChange}
                            />
                            <label htmlFor="history">
                                <span className="slider"></span>
                                Allow History Access
                            </label>
                        </div>
                        <div className="switch">
                            <input
                                type="checkbox"
                                id="calendar"
                                name="calendar"
                                checked={privacySettings.calendar}
                                onChange={handleToggleChange}
                            />
                            <label htmlFor="calendar">
                                <span className="slider"></span>
                                Allow Calendar Access
                            </label>
                        </div>
                        <div className="switch">
                            <input
                                type="checkbox"
                                id="documents"
                                name="documents"
                                checked={privacySettings.documents}
                                onChange={handleToggleChange}
                            />
                            <label htmlFor="documents">
                                <span className="slider"></span>
                                Allow Documents Access
                            </label>
                        </div>
                        <button type="submit" className="submit-button">Submit Options</button>
                    </form>  
                </div>  
  // Handles signout, by removing access token ALL information that could be scraped is removed!
  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  // Testing google calendars
  useEffect(() => {
    if (accessToken) {
      fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setEvents(data.items || []);
        })
        .catch(error => {
          console.error('Error fetching Google Calendar events:', error);
        });
    }
  }, [accessToken]);

  // Manipulate this to change the UI/UX design and implementations
  return (
    <div>
      <h1>Privacy Settings Page</h1>
      {userInfo ? (
        <div>
          <p>profile picture logout</p>
          <div className="profile-container" onClick={() => setShowSignOut(!showSignOut)}>
            <img src={userInfo.picture} alt="Profile" className="profile-picture" />
            {showSignOut && (
              <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
            )}
          </div>
          <p> button or image logout </p>
          <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>



          <p>TESTING</p>
          <h2>Google Calendar Events</h2>
          <ul>
            {events.map(event => (
              <li key={event.id}>
                <p><strong>{event.summary}</strong></p>
                <p>{event.start.dateTime} - {event.end.dateTime}</p>
              </li>
            ))}
          </ul>
        </div>
        
    );




      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
}

/*
keep in function outside of return
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const accessToken = localStorage.getItem('accessToken');

keep in return
{userInfo ? (
        <div>
          <h2>User Information</h2>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Access Token:</strong>{accessToken}</p>


      ) : (
        <p>No user information available.</p>
*/