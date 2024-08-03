import React, { useEffect, useState } from 'react'
import sideDash from '../components/side-dash'
import Prompt from '../components/prompt'
import axios from 'axios'

export default function Dash(){
    const[map, setMap] = useState(null)

    useEffect(() => {
        const initMap = () => {
            const mapOptions = {
                zoom: 8,
                center: { lat: 37.7749, lng: -122.4194 }
            }
        }
        const map = new window.google.maps.Map(document.getElementById('map'), mapOptions)
        setMap(map)
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
        window.initMap = initMap
    }, [])

    const handleLocationSearch = async(location) =>{
        try{
            const response = await axios.post('/query', { prompt: location })
            if(response.data.status == 'OK'){
                const { lat, lng } = response.data.results[0].geometry.location
                console.log(`Location found: ${lat}, ${lng}`)
                map.setCenter({lat, lng})
                map.setZoom(10)
            } else{
                console.error('Location not found: ', response.data.status)
            }
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div className='main'>
            <div className='prompt'>
                <Prompt onSearch={handleLocationSearch} />
            </div>
            <div className='left-dashboard'>
                <sideDash />
            </div> 
            <div className='map' id='map' style={{height: '500px', width: '100%'}} />
        </div>
    )
}