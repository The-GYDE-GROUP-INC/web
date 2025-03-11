import { LocationMarkerOutlined } from '@/components/icons/LocationMarkerOutlined';
import React from 'react';

interface RideCardProps {
  ride: {
    location: string;
    date: string;
    type: string;
  };
}

export const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  return (
    <div className='bg-white p-3 sm:p-4 md:p-6 rounded-2xl border border-neutral-100 shadow flex gap-4 items-center md:items-start md:flex-col justify-between hover:shadow-lg transition-all'>
      {/* Ride Info */}
      <div className='flex items-center gap-2 md:gap-4 flex-grow min-w-0'>
        {/* Icon */}
        <LocationMarkerOutlined className='text-primary flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8' />

        {/* Details */}
        <div className='flex-grow min-w-0'>
          <p className='text-sm sm:text-lg font-semibold text-dark overflow-hidden text-ellipsis whitespace-nowrap'>{ride.location}</p>
          <p className='text-xs sm:text-sm text-dim-grey mt-1'>{ride.date}</p>
        </div>
      </div>

      {/* Ride Type Tag */}
      <div className='flex justify-end sm:w-full'>
        <span className='bg-light-primary text-primary text-sm text-nowrap px-4 py-2 rounded-full'>{ride.type}</span>
      </div>
    </div>
  );
};
