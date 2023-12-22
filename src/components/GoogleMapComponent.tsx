import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '@mui/icons-material';
import { renderToString } from 'react-dom/server';

const MapComponent: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState('');

  const handleSelect = async (value: string) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setAddress(value);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const SetLocationMarker = () => {
    const map = useMapEvents({
      click: (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    const customIcon = L.divIcon({
      className: 'MuiIcon',
      html: renderToString(<Place style={{ fontSize: 32, color: 'green' }} />),
    });

    if (position) {
      return (
        <Marker position={position} icon={customIcon}>
          {address && <Popup>{address}</Popup>}
        </Marker>
      );
    }

    return null;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for places"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={() => handleSelect(address)}>Search</button>

      <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetLocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
