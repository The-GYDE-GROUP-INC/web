'use client';

import { useEffect, useRef, useState } from 'react';

type Location = {
  city: string;
  province: string;
  country: string;
};

type Coordinates = {
  lat: number;
  lng: number;
};

type MapComponentProps = {
  onUpdateLocation: (location: Location, coordinates: Coordinates) => void;
};

const useScript = (url: string): boolean => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    script.onload = () => {
      setIsScriptLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return isScriptLoaded;
};

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

export const MapComponent: React.FC<MapComponentProps> = ({ onUpdateLocation }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const locationBarRef = useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState('');
  const [isLocation, setIsLocation] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [locations, setLocations] = useState<google.maps.places.AutocompletePrediction[]>([]);

  const isScriptLoaded = useScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`);

 useEffect(() => {
  if (!isScriptLoaded || !mapRef.current) return;

 
    center: {
      lat: 47.989921667414194,
      lng: 18.28125,
    },
    zoom: 11,
    mapTypeControl: false,
  });
}, [isScriptLoaded]);

  const showLocation = (position: GeolocationPosition) => {
    setLoading(true);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const city = data.results[0].address_components.find((component) => component.types.includes('locality'))?.long_name;
        const province = data.results[0].address_components.find((component) => component.types.includes('administrative_area_level_1'))?.long_name;
        const country = data.results[0].address_components.find((component) => component.types.includes('country'))?.long_name;

        if (city && province && country) {
          onUpdateLocation({ city, province, country }, { lat: latitude, lng: longitude });
        }
        setIsLocation(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (locationBarRef.current && !locationBarRef.current.contains(event.target as Node)) {
      setIsLocation(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLocationClick = (prediction: google.maps.places.AutocompletePrediction) => {
    const placeId = prediction.place_id;
    const placesService = new window.google.maps.places.PlacesService(mapRef.current!);

    placesService.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const city = data.results[0].address_components.find((component) => component.types.includes('locality'))?.long_name;
            const province = data.results[0].address_components.find((component) => component.types.includes('administrative_area_level_1'))?.long_name;
            const country = data.results[0].address_components.find((component) => component.types.includes('country'))?.long_name;

            if (city && province && country) {
              onUpdateLocation({ city, province, country }, { lat, lng });
            }
            setIsLocation(false);
          })
          .catch((error) => console.log(error));
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!search) return setLocations([]);

    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({ input: search }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setLocations(predictions);
      } else {
        setLocations([]);
      }
    });
  }, [search]);

  return (
    <div className='relative w-full'>
      <div ref={locationBarRef} className='absolute w-full pt-8 px-8 top-0 left-0 ring-0 !z-50'>
        <div onClick={() => setIsLocation(true)} className={`w-full min-h-10 md:min-h-[68px] shadow-lg bg-white overflow-hidden ${isLocation ? 'rounded-xl' : 'rounded-full'}`}>
          <div className='w-full min-h-12 md:min-h-[68px] relative flex items-center px-7 gap-3'>
            {/* <Icon className='text-dark-gray' fontSize={30} icon='line-md:map-marker-filled' /> */}
            <input
              className='bg-transparent w-full text-dark-gray font-semibold text-base border-none outline-none'
              name='location'
              type='text'
              value={search}
              placeholder='Enter a location'
              onChange={handleInputChange}
            />

            {search && (
              <button title='Clear' className='min-w-5 min-h-5 flex items-center justify-center bg-[#dddddd] rounded-full hover:bg-medium-gray/60' onClick={() => setSearch('')}>
                {/* <Icon className='text-dark-gray' icon='ri:close-fill' /> */}
                Search
              </button>
            )}
          </div>

          {isLocation ? (
            search ? (
              <ul className='mt-4 overflow-y-scroll'>
                {locations.map((prediction, index) => (
                  <li
                    onClick={() => handleLocationClick(prediction)}
                    key={index}
                    className='gap-4 overflow-hidden items-center w-full h-16 px-4 flex select-none cursor-pointer hover:bg-gray-200'
                  >
                    <div className='w-8 h-8 rounded-full bg-[#f7f7f7] flex items-center justify-center'>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' aria-hidden='true' role='presentation' focusable='false' className='block w-4 h-4 fill-dark-gray'>
                        <path d='M28 7h-8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v24c0 1.1.9 2 2 2h24a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM8 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0[...]
                      </svg>
                    </div>
                    <p className='truncate'>{prediction.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showLocation);
                  } else {
                    console.log('Geolocation is not supported by this browser.');
                  }
                }}
                className='mt-4 gap-4 items-center w-full py-3 px-4 flex select-none cursor-pointer hover:bg-gray-200'
              >
                {isLoading ? (
                  <p className='text-medium-gray text-sm text-center'>Loading...</p>
                ) : (
                  <>
                    <span className='bg-[#f7f7f7] rounded-full w-10 h-10 flex items-center justify-center'>
                      {/* <Icon className='text-dark-gray' fontSize={19} icon='map:location-arrow' /> */}
                    </span>
                    <p>Use my current location</p>
                  </>
                )}
              </div>
            )
          ) : null}
        </div>
      </div>
      <div ref={mapRef} className='md:rounded-[16px] z-10 mt-3 h-[310px] md:h-[247px] w-full' />
    </div>
  );
};
