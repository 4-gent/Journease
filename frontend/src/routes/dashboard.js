import React, { useEffect, useState } from 'react';
import SideDash from '../components/side-dash';
import Prompt from '../components/prompt';
// import axios from 'axios';
import { NotificationContainer } from 'react-notifications'
// NotificationManager


export default function Dash() {
    const [map, setMap] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    useEffect(() => {
        const initMap = () => {
            const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 37.3861, lng: -122.0839 },
                zoom: 8,
            });
            setMap(mapInstance);

            const directionsServiceInstance = new window.google.maps.DirectionsService()
            const directionsRendererInstance = new window.google.maps.DirectionsRenderer()

            directionsRendererInstance.setMap(mapInstance)

            setDirectionsService(directionsServiceInstance)
            setDirectionsRenderer(directionsRendererInstance)
        };
        if (!window.google || !window.google.maps) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBhrl553lVeueBBjXw7v-HYUGS1m-qs0HM&callback=initMap`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                initMap();
            };
            document.head.appendChild(script);
        } else {
            initMap();
        }
    }, []);

    const calculateAndDisplayRoute = (destination) => {
        if(!directionsService || !directionsRenderer) return

        const origin = {lat: 37.77, lng: -122.447}

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING
            },
            (response, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response)
                } else {
                    window.alert('Directions request failed due to ' + status)
                }
            }
        )
    }

    const handleSearchResult = (data) => {
        console.log('Search Result: ', data)
        if(data.lat && data.lng && map){
            const { lat, lng } = data
            console.log('Updating map center to: ', { lat, lng })
            map.setCenter({lat, lng})
            map.setZoom(15)

            new window.google.maps.Marker({
                position: {lat, lng},
                map: map,
                title: 'Search Result'
            })

            const destination = new window.google.maps.LatLng(lat, lng)
            calculateAndDisplayRoute(destination)
        } else {
            console.error('Invalid data or map not initalized')
        }
    }

    // Retrieve the privacySettings from localStorage
    const privacySettingsStr = localStorage.getItem('privacySettings');
    
    // Parse the JSON string to an object
    const privacySettings = JSON.parse(privacySettingsStr);

    


    console.log(privacySettings.cookies, privacySettings.email, privacySettings.history, privacySettings.calendar, privacySettings.documents)

    if(privacySettings.cookies || privacySettings.email || privacySettings.history || privacySettings.calendar || privacySettings.documents){
        return (
            <div className='main'>
                <p>PROMPTING and SPEED</p>
                <div className='main'>
                <div className='prompt'>
                        <Prompt />
                    </div>
                    <div className='left-dashboard'>
                        <SideDash onSearch={handleSearchResult}/>
                    </div>
                    <div className='map' id='map' style={{ height: '500px', width: '100%' }} />
                </div>
            </div>
        );
    } else {
        return (
            <div className='main'>
                <p>PROMPTING ONLY</p>
                <div className='prompt'>
                    <Prompt />
                </div>
                
                <div className='map' id='map' style={{ height: '500px', width: '100%' }} />
                <NotificationContainer />
                    <SideDash onSearch={handleSearchResult}/>
            </div>
            
        );
    }

}
