'use client';

import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Autocomplete, DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { PickupLocation } from '@/components/icons/PickupLocation';
import { Input } from '@/components/Input';
import { LoadScript } from '@react-google-maps/api';
import { GOOGLE_API_KEY } from '@/constants';
import { LocationMarker } from '@/components/icons/LocationMarker';
import { getFormattedDateTime, moment } from '@/lib/moment';
import momenttz from 'moment-timezone';
import { Button } from '@/components/Button';
import { useTranslations } from 'next-intl';
import { TabPanel } from '@/components/TabPanel';
import { ChevronLeft } from '@/components/icons/ChevronLeft';
import { Star } from '@/components/icons/Star';
import { BankCard } from '@/components/icons/BankCard';
import { Notes } from '@/components/icons/Notes';
import { Chat } from '@/components/icons/Chat';
import { Shield } from '@/components/icons/Shield';
import { PencilOutlined } from '@/components/icons/PencilOutlined';
import { Plus } from '@/components/icons/Plus';
import { DoorOpen } from '@/components/icons/DoorOpen';
import { ChaufferModal } from '@/app/[lang]/dashboard/rides/book-ride/includes/ChaufferModal';
import { useSearchParams } from 'next/navigation';
import { ChaufferToast } from '@/components/ChaufferToast';
import PLACEHOLDER_IMAGE from '@/assets/images/profile/image.png';

interface FormValues {
  pickup: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  step: number;
}

const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

export const BookRideForm = () => {
  const t = useTranslations();

  const way = useSearchParams().get('way');

  const originRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destinationRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [origin, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const [estimatedDistance, setEstimatedDistance] = useState<string | null>(null);
  const [openChaufferDetailsModal, setOpenChaufferDetailsModal] = useState(false);

  const minPickupDate = moment.format('YYYY-MM-DD');
  const minPickupTime = moment.format('HH:mm');

  const initialValues: FormValues = {
    pickup: '',
    destination: '',
    pickupDate: '',
    pickupTime: '',
    step: 2,
  };

  // Route calculation and map adjustment
  const calculateRoute = (destinationCoords: google.maps.LatLngLiteral) => {
    if (!origin || !destinationCoords) return;

    if (map) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(origin);
      bounds.extend(destinationCoords);
      map.fitBounds(bounds);
    }

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination: destinationCoords,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
          console.log({ result });
          // Get estimated time & distance
          const routeLeg = result.routes[0]?.legs[0];
          setEstimatedTime(routeLeg?.duration?.text || null);
          setEstimatedDistance(routeLeg?.distance?.text || null);
        } else {
          console.log('Directions request failed due to', status);
        }
      }
    );
  };

  const validationSchema = Yup.object().shape({
    pickup: Yup.string().when('step', { is: 1, then: (schema) => schema.required(t('dashboard.ride-book.pickup-location-required')) }),
    destination: Yup.string().when('step', { is: 1, then: (schema) => schema.required(t('dashboard.ride-book.pickup-location-required')) }),
    pickupDate: Yup.string().when('step', {
      is: 1,
      then: (s) =>
        s.required(t('dashboard.ride-book.pickup-date-required')).test('is-future-date', t('dashboard.ride-book.pickup-date-past-error'), (value) => {
          return momenttz(value).isSameOrAfter(momenttz().format('YYYY-MM-DD'));
        }),
    }),
    pickupTime: Yup.string().when('step', { is: 1, then: (s) => s.required(t('dashboard.ride-book.pickup-time-required')) }),
  });

  const handleSubmit = (values: FormValues) => {
    console.log('Form Submitted:', values);
  };

  useEffect(() => {
    if (way === 'true') {
    }
  }, [way]);

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

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={['places', 'geometry', 'drawing', 'visualization']}>
      <Formik enableReinitialize validateOnBlur validateOnChange validateOnMount validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, handleBlur, handleChange, values, isValid }) => (
          <Form>
            {openChaufferDetailsModal && <ChaufferModal open={openChaufferDetailsModal} onClose={() => setOpenChaufferDetailsModal(false)} />}
            {way === 'true' && (
              <>
                <ChaufferToast
                  onClose={() => {}}
                  image={PLACEHOLDER_IMAGE}
                  time='9:41 AM'
                  title='Your chauffeur is on the way!'
                  description='Edward is on the way. The arrival time is in 3 minutes. Tap here for more details.'
                />
                <ChaufferToast
                  onClose={() => {}}
                  image={PLACEHOLDER_IMAGE}
                  time='9:41 AM'
                  title='Your chauffeur is here!'
                  description='Your chauffeur has arrived. Please look for BMW 7 Series (B-KB-8311).'
                />
              </>
            )}

            <h1 className='text-3xl font-montreal'>
              {values.step === 1
                ? t('dashboard.book-ride')
                : values.step === 2
                ? t('dashboard.booking-confirmation')
                : t('dashboard.ride-book.arriving-time', { time: '12 Minutes' })}
            </h1>
            <div className='py-8'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                <div className='gap-6 flex flex-col min-h-[500px]'>
                  <TabPanel value={values.step} index={1}>
                    {/* Pickup Location */}
                    <div>
                      <label className='block text-sm font-medium mb-2'>{t('dashboard.ride-book.pickup-location')}</label>
                      <Autocomplete
                        onLoad={(ref) => (originRef.current = ref)}
                        onPlaceChanged={() => {
                          const place = originRef.current?.getPlace();
                          if (place?.geometry?.location) {
                            const coords = {
                              lat: place.geometry.location.lat(),
                              lng: place.geometry.location.lng(),
                            };
                            setCurrentLocation(coords);
                            setFieldValue('pickup', place.formatted_address ?? '');
                          }
                        }}
                      >
                        <Input className='w-full' type='text' placeholder={t('dashboard.ride-book.pickup-location-placeholder')} startIcon={<PickupLocation size={24} />} />
                      </Autocomplete>
                      <ErrorMessage name='pickup' component='div' className='text-red-500 text-sm' />
                    </div>

                    {/* Drop-off Location */}
                    <div>
                      <label className='block text-sm font-medium mb-2'>{t('dashboard.ride-book.dropoff-location')}</label>
                      <Autocomplete
                        onLoad={(ref) => (destinationRef.current = ref)}
                        onPlaceChanged={() => {
                          const place = destinationRef.current?.getPlace();
                          if (place?.geometry?.location) {
                            const newDestination = {
                              lat: place.geometry.location.lat(),
                              lng: place.geometry.location.lng(),
                            };
                            setDestination(newDestination);
                            setFieldValue('destination', place.formatted_address ?? '');
                            calculateRoute(newDestination);
                          }
                        }}
                      >
                        <Input
                          className='w-full'
                          type='text'
                          placeholder={t('dashboard.ride-book.dropoff-location-placeholder')}
                          startIcon={<LocationMarker size={24} className='text-red-600' />}
                        />
                      </Autocomplete>
                      <ErrorMessage name='destination' component='div' className='text-red-500 text-sm' />
                    </div>

                    {/* Pickup Date */}
                    <div>
                      <label className='block text-sm font-medium mb-2'>{t('dashboard.ride-book.pickup-date')}</label>
                      <Input onChange={handleChange} onBlur={handleBlur} type='date' name='pickupDate' className='w-full' min={minPickupDate} />
                      <ErrorMessage name='pickupDate' component='div' className='text-red-500 text-sm' />
                    </div>

                    {/* Pickup Time */}
                    <div>
                      <label className='block text-sm font-medium mb-2'>{t('dashboard.ride-book.pickup-time')}</label>
                      <Input onChange={handleChange} onBlur={handleBlur} type='time' name='pickupTime' className='w-full' min={minPickupTime} />
                      <ErrorMessage name='pickupTime' component='div' className='text-red-500 text-sm' />
                    </div>
                  </TabPanel>
                  <TabPanel value={values.step} index={2}>
                    <p>Pickup Time: {getFormattedDateTime(values.pickupDate, values.pickupTime)}</p>
                    <p>
                      Estimated route : {estimatedTime} | {estimatedDistance}
                    </p>
                    <div className='bg-[#f6f6f6] py-3 pr-3 pl-6 rounded-lg'>
                      <ol className='relative border-s-2 border-neutral-400'>
                        <li className='mb-6 ms-6'>
                          <span className='absolute flex items-center justify-center w-4 h-4 border-4 border-neutral-400 bg-neutral-200 rounded-full -left-2 ring-4 ring-[#f6f6f6]' />
                          <p className='text-nowrap overflow-hidden text-ellipsis'>1234 W Maple Ave McBee, South Carolina 1234 W Maple Ave McBee, South Carolina</p>
                        </li>
                        <li className='ms-6'>
                          <span className='absolute flex items-center justify-center w-4 h-4 bg-white border-4 border-primary rounded-full -left-2 ring-4 mt-1 ring-[#f6f6f6]' />
                          <p className='text-nowrap overflow-hidden text-ellipsis'>1234 W Maple Ave McBee, South Carolina 1234 W Maple Ave McBee, South Carolina</p>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <div className='flex items-center justify-between'>
                        <p className='text-lg font-medium'>Your Chauffeur (1/1)</p>
                        <div className='flex items-center gap-3'>
                          <button>
                            <ChevronLeft size={18} />
                          </button>
                          <button>
                            <ChevronLeft size={18} className='rotate-180' />
                          </button>
                        </div>
                      </div>
                      <div className='flex items-center justify-between mt-4'>
                        <div className='flex gap-3'>
                          <div className='w-14 h-14 rounded-full flex-shrink-0 bg-actual-grey' />
                          <div>
                            <div className='flex items-center gap-2'>
                              <p className='text-lg font-medium'>Edward</p>
                              <Star className='text-yellow' />
                              <p className='text-lg font-medium'>4.8</p>
                            </div>
                            <div className='flex items-center gap-3'>
                              <p>BMW 7 Series</p>
                              <p>B-KB-8311</p>
                            </div>
                          </div>
                        </div>
                        <Button onClick={() => setOpenChaufferDetailsModal(true)} type='button' className='p-3 px-6'>
                          Details
                        </Button>
                      </div>
                    </div>
                    <div className='bg-divider w-full h-[1px]' />
                    <div className='flex items-center justify-between mt-4'>
                      <div className='flex gap-3'>
                        <div className='w-14 h-14 rounded-xl flex-shrink-0 bg-actual-grey flex items-center justify-center'>
                          <BankCard size={24} className='text-primary' />
                        </div>
                        <div>
                          <p className='text-lg font-medium'>Price $162</p>
                          <p>Credit or Debit Card</p>
                        </div>
                      </div>
                      <span className='bg-success-subtle text-success text-sm font-medium px-4 h-7 flex items-center justify-center rounded-full border border-success-light'>
                        Paid
                      </span>
                    </div>
                    <Input startIcon={<Notes size={24} />} className='w-full' placeholder='Add notes for chauffeur (optional)' />
                  </TabPanel>
                  <TabPanel value={values.step} index={3}>
                    <div>
                      <div className='flex items-center justify-between'>
                        <p className='text-lg font-medium'>Your Chauffeur (1/1)</p>
                        <div className='flex items-center gap-3'>
                          <button>
                            <ChevronLeft size={18} />
                          </button>
                          <button>
                            <ChevronLeft size={18} className='rotate-180' />
                          </button>
                        </div>
                      </div>
                      <div className='flex items-center justify-between mt-4'>
                        <div className='flex gap-3'>
                          <div className='w-14 h-14 rounded-full flex-shrink-0 bg-actual-grey' />
                          <div>
                            <div className='flex items-center gap-2'>
                              <p className='text-lg font-medium'>Edward</p>
                              <Star className='text-yellow' />
                              <p className='text-lg font-medium'>4.8</p>
                            </div>
                            <div className='flex items-center gap-3'>
                              <p>BMW 7 Series</p>
                              <p>B-KB-8311</p>
                            </div>
                          </div>
                        </div>
                        <Button onClick={() => setOpenChaufferDetailsModal(true)} type='button' className='p-3 px-6'>
                          Details
                        </Button>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 bg-actual-grey h-[100px] rounded-lg overflow-hidden gap-2'>
                      <button className='h-full flex items-center justify-center flex-col gap-2'>
                        <Chat size={28} />
                        <p>{t('dashboard.contact-driver')}</p>
                      </button>
                      <button className='h-full flex items-center justify-center flex-col gap-2'>
                        <Shield size={28} />
                        <p>{t('dashboard.safety')}</p>
                      </button>
                    </div>
                  </TabPanel>
                  <TabPanel value={values.step} index={4}>
                    <div>
                      <div className='flex items-center justify-between'>
                        <p className='text-lg font-medium'>Your Chauffeur (1/1)</p>
                        <div className='flex items-center gap-3'>
                          <button>
                            <ChevronLeft size={18} />
                          </button>
                          <button>
                            <ChevronLeft size={18} className='rotate-180' />
                          </button>
                        </div>
                      </div>
                      <div className='flex items-center justify-between mt-4'>
                        <div className='flex gap-3'>
                          <div className='w-14 h-14 rounded-full flex-shrink-0 bg-actual-grey' />
                          <div>
                            <div className='flex items-center gap-2'>
                              <p className='text-lg font-medium'>Edward</p>
                              <Star className='text-yellow' />
                              <p className='text-lg font-medium'>4.8</p>
                            </div>
                            <div className='flex items-center gap-3'>
                              <p>BMW 7 Series</p>
                              <p>B-KB-8311</p>
                            </div>
                          </div>
                        </div>
                        <Button type='button' className='p-3 px-6'>
                          Details
                        </Button>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 bg-actual-grey h-[100px] rounded-lg overflow-hidden gap-2'>
                      <button className='h-full flex items-center justify-center flex-col gap-2'>
                        <Chat size={28} />
                        <p>{t('dashboard.contact-driver')}</p>
                      </button>
                      <button className='h-full flex items-center justify-center flex-col gap-2'>
                        <Shield size={28} />
                        <p>{t('dashboard.safety')}</p>
                      </button>
                    </div>
                    <div className='bg-[#f6f6f6] py-3 pr-3 pl-6 rounded-lg'>
                      <div className='flex flex-col gap-0.5'>
                        <div className='flex items-center gap-4'>
                          <span className='flex items-center justify-center flex-shrink-0 w-4 h-4 border-4 border-neutral-400 bg-neutral-200 rounded-full' />
                          <p className='text-nowrap overflow-hidden text-sm text-ellipsis'>1234 W Maple Ave McBee, South Carolina 1234 W Maple Ave McBee, South Carolina</p>
                        </div>
                        <div className='w-0.5 h-[31px] rounded-sm bg-neutral-400 ml-[6.5px]' />
                        <button className='flex items-center gap-4'>
                          <span className='flex items-center justify-center w-4 h-4 bg-primary text-white rounded-full'>
                            <Plus size={12} />
                          </span>
                          <p className='text-nowrap overflow-hidden text-sm text-ellipsis'>Add stop</p>
                        </button>
                        <div className='w-0.5 h-[31px] rounded-sm bg-primary ml-[6.5px]' />
                        <div className='flex items-center gap-4'>
                          <span className='flex items-center justify-center flex-shrink-0 w-4 h-4 bg-white border-4 border-primary rounded-full' />
                          <p className='text-nowrap overflow-hidden text-sm text-ellipsis'>1234 W Maple Ave McBee, South Carolina 1234 W Maple Ave McBee, South Carolina</p>
                          <button className='flex-shrink-0'>
                            <PencilOutlined size={24} className='text-primary' />
                          </button>
                        </div>
                      </div>
                      <button className='text-primary font-medium mt-4'>Edit destinations</button>
                    </div>
                    <div className='flex items-center justify-between mt-4'>
                      <div className='flex gap-3'>
                        <div className='w-14 h-14 rounded-xl flex-shrink-0 bg-actual-grey flex items-center justify-center'>
                          <BankCard size={24} className='text-primary' />
                        </div>
                        <div>
                          <p className='text-lg font-medium'>Price $162</p>
                          <p>Credit or Debit Card</p>
                        </div>
                      </div>
                      <span className='bg-success-subtle text-success text-sm font-medium px-4 h-7 flex items-center justify-center rounded-full border border-success-light'>
                        Paid
                      </span>
                    </div>
                    <button className='bg-light-primary transition-all active:text-white active:bg-primary rounded-lg p-4 flex text-left items-center gap-2'>
                      <DoorOpen size={24} />
                      <p className='font-medium flex-grow'>End ride</p>
                      <ChevronLeft size={24} className='rotate-180' />
                    </button>
                  </TabPanel>

                  {values.step !== 4 && (
                    <div className='flex-grow flex items-end'>
                      <Button
                        onClick={() => {
                          if (way === 'true') {
                          } else if (values.step < 4) {
                            setFieldValue('step', values.step + 1);
                          }
                        }}
                        disabled={!isValid}
                        type='button'
                        className='p-3 w-full'
                      >
                        {values.step === 1 ? t('continue') : values.step === 2 ? t('dashboard.ride-book.confirm-order') : t('dashboard.ride-book.next-step')}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Map Section */}
                <div className='relative'>
                  <div className='lg:sticky top-4'>
                    <GoogleMap options={{ disableDefaultUI: true }} center={origin || defaultCenter} zoom={12} mapContainerClassName='w-full h-[500px] relative' onLoad={setMap}>
                      {origin && <Marker position={origin} />}
                      {destination && <Marker position={destination} title='🎯 Destination' />}
                      {directions && <DirectionsRenderer directions={directions} />}
                    </GoogleMap>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </LoadScript>
  );
};
