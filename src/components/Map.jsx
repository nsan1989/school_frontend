import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
    const position = [24.83987, 93.94676];
    return (
        <MapContainer center={position} zoom={13} style={{height:"100%",width:"100%"}}>
            <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    St.Anthony School
                </Popup>
            </Marker>
        </MapContainer>
    )
}