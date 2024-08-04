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
                <>
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
                <div className={styles.disclaimer}>
                    <text>
                        1. Information We Collect. Personalized Recommendations: We collect and analyze your chat history and Instagram activity to provide tailored location suggestions. This data is used to enhance your experience by recommending places that match your interests and preferences. Location-Based Suggestions: We gather information about your current preferences and past choices to offer location-based recommendations. This includes tracking your favorite restaurants and the types of cuisine you prefer. Map of You: We create specialized maps that visualize the places you like and help you discover similar spots in new areas. This involves collecting data about your visited locations and liked places. 2. Sharing Your Information. We do not share your personal information with third parties, except in the following circumstances: With your consent, For legal reasons, such as complying with a legal obligation or protecting our rights, or With service providers who assist us in operating our app, as long as they agree to keep your information confidential. 4. Your Privacy Choices. Privacy Settings: You can adjust your privacy settings within the app to control how we collect and use your data. This includes managing your chat history and Instagram activity sharing preferences. Location Data: You can choose to disable location tracking at any time through your device settings. However, this may limit the app's ability to provide location-based suggestions. 5. Security. We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure. 6. Changes to This Privacy Policy. We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website and updating the effective date. 7. Contact Us. If you have any questions or concerns about this Privacy Policy, please contact us at: help@journease.com
                    </text>
                    <br/>
                    <br/>
                    <text>
                        By using our app, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please do not use our app.
                    </text>
                </div>
                </>
            )}
            
        </div>
    );
}
