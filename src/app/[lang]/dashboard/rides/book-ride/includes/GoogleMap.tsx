'use client';

import { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { Input } from '@/components/Input';
import { PickupLocation } from '@/components/icons/PickupLocation';

const containerStyle = { width: '100%', height: '500px' };
const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco as default

export const GoogleMapsComponent = () => {
  const [, setMap] = useState<google.maps.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const originRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destinationRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Get live location tracking
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        () => console.log('Error getting location!'),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }
  }, []);

  // Handle Route Calculation
  const calculateRoute = () => {
    if (!currentLocation || !destination) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: currentLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) setDirections(result);
        else console.error('Directions request failed due to', status);
      }
    );
  };

  return (
    <div className='flex flex-col space-y-4 p-4'>
      {/* Search Inputs */}
      <div className='flex space-x-4'>
        <Autocomplete
          onLoad={(ref) => (originRef.current = ref)}
          onPlaceChanged={() =>
            setCurrentLocation({
              lat: originRef.current!.getPlace()?.geometry?.location?.lat() as number,
              lng: originRef.current!.getPlace()?.geometry?.location?.lng() as number,
            })
          }
        >
          <Input type='text' placeholder='Enter your location' className='w-full' startIcon={<PickupLocation size={24} className='text-primary-dark' />} />
        </Autocomplete>

        <Autocomplete
          onLoad={(ref) => (destinationRef.current = ref)}
          onPlaceChanged={() =>
            setDestination({
              lat: destinationRef.current!.getPlace()?.geometry?.location?.lat() as number,
              lng: destinationRef.current!.getPlace()?.geometry?.location?.lng() as number,
            })
          }
        >
          <Input type='text' placeholder='Enter destination' />
        </Autocomplete>

        <button onClick={calculateRoute} className='p-2 bg-blue-600 text-white rounded'>
          Get Route
        </button>
      </div>

      {/* Google Map */}
      <GoogleMap mapContainerStyle={containerStyle} center={currentLocation || defaultCenter} zoom={14} onLoad={setMap}>
        {currentLocation && <Marker position={currentLocation} />}
        {destination && <Marker position={destination} label='🎯 Destination' />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};
