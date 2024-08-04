import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function SideDash(){
    const [speed_dial, setSpeedDial] = useState([]);
    const [recommended, setRecommended] = useState([]);
    
    useEffect(() => {
        axios.get('/side-dash')
            .then(response => {
                setSpeedDial(response.data.speed_dial)
                setRecommended(response.data.recommended)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    
    return(
        <div>
            <div className='speed-dial'>
                {speed_dial.map((location) => (
                    <div key={location.id}>
                        <h3>{location.name}</h3>
                        <p>{location.address}</p>
                    </div>
                ))}
            </div>
            <div className='recommended'>
                {recommended.map((location) => (
                    <div key={location.id}>
                        <h3>{location.name}</h3>
                        <p>{location.address}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}