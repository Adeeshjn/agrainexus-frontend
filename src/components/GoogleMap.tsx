// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const MapComponent = ({ center, zoom }: any) => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [location, setLocation] = useState(center);

//     const handleSearchChange = (event: any) => {
//         setSearchQuery(event.target.value);
//     };

//     const handleSearchSubmit = async (event: any) => {
//         event.preventDefault();
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
//             );
//             const data = await response.json();
//             if (data.length > 0) {
//                 const { lat, lon } = data[0];
//                 setLocation([parseFloat(lat), parseFloat(lon)]);
//             }
//         } catch (error) {
//             console.error('Error fetching location:', error);
//         }
//     };

//     const mapStyle = {
//         height: '400px',
//         width: '100%',
//         borderRadius: '8px',
//         boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
//     };

//     const formStyle = {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: '20px 0',
//         padding: '10px', // Added padding for a better visual
//         backgroundColor: '#f9f9f9', // Added background color for a better visual
//     };

//     const inputStyle = {
//         flex: 1, // Make the input field take the remaining space
//         padding: '8px',
//         marginRight: '10px',
//         border: '1px solid #ccc',
//         borderRadius: '4px',
//         minWidth: '250px',
//         outline: 'none', // Remove the default input focus outline
//     };

//     const buttonStyle = {
//         padding: '8px 16px',
//         background: '#007BFF',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         outline: 'none', // Remove the default button focus outline
//     };

//     return (
//         <div>
//             <form onSubmit={handleSearchSubmit} >
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Mark your location..."
//                     style={inputStyle}
//                 />
//                 <button type="submit" style={buttonStyle}>
//                     Mark
//                 </button>
//             </form>
//             <MapContainer center={location} zoom={zoom} style={mapStyle}>
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <Marker position={location}>
//                     <Popup>Searched Location</Popup>
//                 </Marker>
//             </MapContainer>
//         </div>
//     );
// };

// export default MapComponent;

import React from 'react'

export default function GoogleMap() {
  return (
    <div>GoogleMap</div>
  )
}
