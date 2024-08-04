import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function SideDash({ onSearch }){
    // const [speed_dial, setSpeedDial] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [choice, setChoice] = useState({ choice: "" });
    
    useEffect(() => {
        axios.get('http://localhost:8080/temp')
            .then(response => {
                setRecommended(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    
    const handleChoice = async(e) => {
        try{
            console.log(choice)
            const choice = await axios.post('http://localhost:4000/directions', choice)
            console.log(choice)
            if (onSearch) {
                onSearch(choice.data)
            }
        } catch (e) {
            console.log('Error:', e)
        }
    } 

    return(
        <div>
            <div className='speed-dial'>
            </div>
            <div className='recommended'>
                {recommended.map((location) => (
                    <div key={location.id} onClick={() => handleChoice(choice)} style={{curser: 'pointer'}}>
                        <h3>{location.name}</h3>
                        <p value={choice.choice} onChange={(e) => setChoice({ ...choice, choice: e.target.value})}>{location.choice}</p>
                        <p>{location.distance}</p>
                        <p>{location.price_range}</p>
                        <ol>
                            <li>{location.hours}</li>
                        </ol>
                    </div>
                ))}
            </div>
        </div>
    )
}