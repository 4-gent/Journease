<<<<<<< HEAD
import React from 'react'

export default function Privacy(){
    return(
        <div>
            Privacy settings page
        </div>
    )
=======
import React from 'react'

export default function Privacy(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = localStorage.getItem('accessToken')

    return(
        <div>
            Privacy settings page
     
            {userInfo ? (
            <div>
                <h2>User Information</h2>
                <p><strong>Name:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <img src={userInfo.picture} alt="Profile" width="100" />
                <p><strong>Access Token:</strong> {accessToken}</p>
            </div>
            ) : (
            <p>No user information available.</p>
            )}
        </div>
    )
>>>>>>> 2cd7879c66fa9c15a39d54b8e5a13c3b35993207
}