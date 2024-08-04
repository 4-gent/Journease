import React, { useState } from 'react';
import '../public/privacy.css';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
  // Allows for redirection back to OAuth2 or the dashboard
  const navigate = useNavigate();
  const [showSignOut, setShowSignOut] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);
    const [privacySettings, setPrivacySettings] = useState({
        cookies: false,
        email: false,
        history: false,
        calendar: false,
        documents: false
    });
    const [showUserInfo, setShowUserInfo] = useState(false);

    const handleToggleChange = (e) => {
        const { name, checked } = e.target;
        setPrivacySettings(prevSettings => ({
            ...prevSettings,
            [name]: checked
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected Privacy Options:', privacySettings);
        setShowUserInfo(true); // Show user info after submission
    };

    // Handles signout, by removing access token ALL information that could be scraped is removed!
    const handleSignOut = () => {
      // Clear user information and access token from localStorage
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');

      // Redirect to the login page or home page
      navigate('/');
    };

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const accessToken = localStorage.getItem('accessToken');

    const fetchCalendarEvents = async (accessToken) => {
      try {
        const response = await fetch('https://www.googleapis.com/auth/calendar.readonly', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await response.json();
        setCalendarEvents(data.items || []);
      } catch (error) {
        console.error('Failed to fetch calendar events:', error);
      }
    };

    fetchCalendarEvents()

    return (
      
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

            {showUserInfo && userInfo && (
                <div className="user-info">
                    <h2>User Information</h2>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <img src={userInfo.picture} alt="Profile" width="100" />
                    <p></p>
                    <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
                </div>
            )}

        </div>
        
    );
}