import React, {useEffect } from 'react';
// useState
import axios from 'axios';

export default function SideDash({ onSearch }) {
    // const [recommended, setRecommended] = useState([]);

    // Parse storedPrompt from localStorage
    const storedPrompt = JSON.parse(localStorage.getItem('prompt')) || [];

    console.log('Stored Prompt:', storedPrompt);

    useEffect(() => {
        axios.get('http://localhost:8080/temp')
            .then(response => {
                const data = Array.isArray(response.data) ? response.data : [];
                // setRecommended(data);
                console.log('Recommended Data:', data);
            })
            .catch(error => {
                console.log('Error fetching recommended data:', error);
            });
    }, []);

    const handleChoice = async (location) => {
        try {
            
            console.log('Selected choice:', location);

            const response = await axios.post('http://localhost:4000/directions', { prompt: location });

            console.log('Response from server:', response);
            if (onSearch) {
                onSearch(response.data);
            }
        } catch (e) {
            console.log('Error:', e);
        }
    };

    return (
        <div>
            <div className='recommended'>
                {storedPrompt.map((location, index) => {
                    console.log('Location:', location); // Print each location object
                    return (
                        <div key={index} onClick={() => handleChoice(location.address)} style={{ cursor: 'pointer' }}>
                            <h3>{location.name}</h3>
                            <p>{location.address}</p>
                            <p>{location.distance}</p>
                            <p>{location.price_range}</p>
                            <ol>
                                {location.hours && Object.entries(location.hours).map(([day, hours], i) => (
                                    <li key={i}>{day}: {hours}</li>
                                ))}
                            </ol>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
