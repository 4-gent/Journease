import React, { useEffect } from 'react'
import './public/main.css'

export default function Main(){
    useEffect(() => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: '858097161571-jcbqvah8djskts47h0qabraedtnb46v6.apps.googleusercontent.com',
            });
        })
    }, [])
    const handleSignIn = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(googleUser => {
            const profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId());
            console.log('Full Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
        })
    }
    return(
        // this will be sign in landing page
        <div>
            <h1>Sign in</h1>
            <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
    )
}