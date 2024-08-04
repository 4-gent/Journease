<<<<<<< HEAD
import React, { useState } from 'react';
import styles from '../public/Privacy.module.css'; // Import the CSS module
import Dashboard from './dashboard.js';

export default function Privacy() {
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
        <div className={styles.privacyPageWrapper}>
            {showUserInfo && userInfo ? (
                <Dashboard />
            ) : (
                <div className={styles.privacyContainer}>
                    <h1>Privacy Settings</h1>
                    <div className={styles.form}>
                        <form onSubmit={handleSubmit} className={styles.privacyForm}>
                            <div className={styles.switch}>
                                <input
                                    type="checkbox"
                                    id="cookies"
                                    name="cookies"
                                    checked={privacySettings.cookies}
                                    onChange={handleToggleChange}
                                />
                                <label htmlFor="cookies">
                                    <span className={styles.slider}></span>
                                    Allow Cookies
                                </label>
                            </div>
                            <div className={styles.switch}>
                                <input
                                    type="checkbox"
                                    id="email"
                                    name="email"
                                    checked={privacySettings.email}
                                    onChange={handleToggleChange}
                                />
                                <label htmlFor="email">
                                    <span className={styles.slider}></span>
                                    Allow Email Access
                                </label>
                            </div>
                            <div className={styles.switch}>
                                <input
                                    type="checkbox"
                                    id="history"
                                    name="history"
                                    checked={privacySettings.history}
                                    onChange={handleToggleChange}
                                />
                                <label htmlFor="history">
                                    <span className={styles.slider}></span>
                                    Allow History Access
                                </label>
                            </div>
                            <div className={styles.switch}>
                                <input
                                    type="checkbox"
                                    id="calendar"
                                    name="calendar"
                                    checked={privacySettings.calendar}
                                    onChange={handleToggleChange}
                                />
                                <label htmlFor="calendar">
                                    <span className={styles.slider}></span>
                                    Allow Calendar Access
                                </label>
                            </div>
                            <div className={styles.switch}>
                                <input
                                    type="checkbox"
                                    id="documents"
                                    name="documents"
                                    checked={privacySettings.documents}
                                    onChange={handleToggleChange}
                                />
                                <label htmlFor="documents">
                                    <span className={styles.slider}></span>
                                    Allow Documents Access
                                </label>
                            </div>
                            <button type="submit" className={styles.submitButton}>Submit Options</button>
                        </form>
                    </div>
                </div>
                
                
            )}
            
        </div>
    );
}
=======
import React, { useState } from 'react';
import '../public/privacy.css';
import Dashboard from './dashboard.js';
import { useNavigate } from "react-router-dom";

export default function Privacy() {
    const [privacySettings, setPrivacySettings] = useState({
        cookies: false,
        email: false,
        history: false,
        calendar: false,
        documents: false
    });
    const navigate = useNavigate();
    const [showUserInfo, setShowUserInfo] = useState(false);

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

    const submit = () => {
      navigate('/dashboard')
    }

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
                        <button type="submit" className="submit-button" onClick={submit}>Submit Options</button>
                    </form>  
                </div>  
            )}
        </div>
        
    );
}
>>>>>>> main
