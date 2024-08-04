import React, { useState } from "react";
import {ReactComponent as Marker} from '../public/marker.svg';
// import { useRouteLoaderData } from "react-router-dom";
import './item.css'

export default function Item({ name, address, distance, onClick }) {
    return (
        <div className="item-container" onClick={onClick}>
            <div className="item-name">{name}</div>
            <div className="item-location">{address}</div>
            <div className="item-distance">
                <span className="marker-container"><Marker className="marker"/></span>
                {distance} miles away
            </div>
        </div>
    );
}