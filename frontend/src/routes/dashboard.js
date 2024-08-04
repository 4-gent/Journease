import React, { useEffect, useState } from 'react';
import SideDash from '../components/side-dash';
import Prompt from '../components/prompt';
import axios from 'axios';
import { NotificationManager, NotificationContainer } from 'react-notifications'

export default function Dash() {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const initMap = () => {
            const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
            setMap(mapInstance);
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

    const handleSearchResult = (data) => {
        console.log('Search Result:', data);
        if (data.lat && data.lng && map) {
            const {lat, lng} = data
            console.log('Updating map center to: ', {lat, lng})
            map.setCenter({lat, lng})
            map.setZoom(15)

            new window.google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: 'Search Result'
            });
        } else{
            console.error('Invalid data or map not initialized')
        }
    }

    return (
        <div className='main'>
            <div className='prompt'>
                <Prompt />
            </div>
            
            <div className='map' id='map' style={{ height: '500px', width: '100%' }} />
            <NotificationContainer />
                <SideDash onSearch={handleSearchResult}/>
        </div>
    );
}
