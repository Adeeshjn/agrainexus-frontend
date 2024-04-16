import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [map, setMap] = useState(null);

    const handleSearch = () => {
        if (!searchTerm) return;

        // Use a geocoding service to get the location based on the search term
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: searchTerm }, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                setLocation({ lat: lat(), lng: lng() });
            } else {
                console.error('Error fetching location:', status);
            }
        });
    };

    const onLoad = (map: any) => {
        setMap(map);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <LoadScript googleMapsApiKey="AIzaSyA3L14rPXjG0XSrsaOnlDeIWXCu9FHtuTw">
                <GoogleMap
                    mapContainerStyle={{ height: '400px', width: '100%' }}
                    center={location}
                    zoom={12}
                    onLoad={onLoad}
                >
                    <Marker position={location} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default GoogleMapSearch;
