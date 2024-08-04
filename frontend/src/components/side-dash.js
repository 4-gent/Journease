import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function SideDash({ onSearch }){
    // const [speed_dial, setSpeedDial] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [choice, setChoice] = useState({ address: "" });
    
    useEffect(() => {
        axios.get('http://localhost:5000/query')
            .then(response => {
                setRecommended(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    
    const handleChoice = async(e) => {
        try{
            console.log(address)
            const address = await axios.post('http://localhost:4000/directions', address)
            console.log(address)
            if (onSearch) {
                onSearch(address.data)
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
                    <div key={location.id} onClick={() => handleChoice(address)} style={{curser: 'pointer'}}>
                        <h3>{location.name}</h3>
                        <p value={choice.address} onChange={(e) => setChoice({ ...choice, address: e.target.value})}>{location.address}</p>
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