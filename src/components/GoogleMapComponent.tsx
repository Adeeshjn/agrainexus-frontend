// src/components/MapContainer.tsx
import React, { useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import GoogleAutoComplete from 'react-google-autocomplete';
import { Typography } from '@mui/material';

interface MapContainerProps {}

interface MarkerPosition {
  lat: number | null;
  lng: number | null;
}

const containerStyle = {
  marginTop: '30px',
  marginLeft: '30px',
  width: '400px', // Adjust the width here
  height: '400px',
};

const MapContainer: React.FC<MapContainerProps> = () => {
  const [marker, setMarker] = React.useState<MarkerPosition>({ lat: null, lng: null });
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
  });

  const handlePlaceSelected = (place: any) => {
    // Check if place and place.geometry are defined before accessing location
    if (place?.geometry?.location) {
      setMarker({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
          // Fallback to a default location if there is an error
          setMarker({ lat: -34.397, lng: 150.644 });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Fallback to a default location if geolocation is not supported
      setMarker({ lat: -34.397, lng: 150.644 });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []); // Run only once when the component mounts

  return (
    <div>
      {/* <GoogleAutoComplete onSelect={handlePlaceSelected} /> */}
      {isLoaded && marker.lat !== null && marker.lng !== null && (
        <GoogleMap mapContainerStyle={containerStyle} center={{ lat: marker.lat, lng: marker.lng }} zoom={8}>
          <Marker position={{ lat: marker.lat, lng: marker.lng }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default MapContainer;
// import React from 'react'

// export default function GoogleMapComponent() {
//   return (
//     <div>GoogleMapComponent</div>
//   )
// }
