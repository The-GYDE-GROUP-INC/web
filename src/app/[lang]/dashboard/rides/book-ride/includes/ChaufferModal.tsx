'use client';

import { Star } from '@/components/icons/Star';
import { Watch } from '@/components/icons/Watch';
import { ScrollableDates } from '@/components/ScrollableDates';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CAR from '@/assets/images/car.png';
import { Button } from '@/components/Button';

interface Props {
  onClose?: () => void;
  open: boolean;
}

export const ChaufferModal = ({ onClose }: Props) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger open animation
    setShow(true);
  }, []);

  useOutsideClick({
    ref,
    handler() {
      handleClose();
    },
  });

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 ${show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className={`relative p-4 w-full max-w-xl max-h-full transform ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} transition-all duration-300`}>
        <div ref={ref} className='relative bg-white rounded-lg shadow-sm'>
          <div className='rounded-t pt-4'>
            <h3 className='text-2xl font-semibold text-center px-4'>Chauffeur Detail</h3>
            <div className='pt-6 overflow-auto max-h-[450px] px-4'>
              <div className='flex gap-3'>
                <div className='w-14 h-14 rounded-full flex-shrink-0 bg-actual-grey' />
                <div>
                  <div className='flex items-center gap-2'>
                    <p className='text-lg font-medium'>Edward</p>
                    <Star className='text-yellow' />
                    <p className='text-lg font-medium'>4.8</p>
                  </div>
                  <p>$65 USD/hour</p>
                </div>
              </div>
              <p className='my-6'>
                “Edward is a top-rated driver with a 4.8-star rating, offering premium service with his BMW 7 Series. Available from Monday to Saturday, 9 AM - 5 PM, at $65/hour,
                he ensures a comfortable and reliable ride for every journey.”
              </p>
              <div className='flex items-center gap-2'>
                <Watch size={24} />
                <p className='text-lg font-medium leading-5'>Availability Time</p>
              </div>
              <div className='bg-neutral-200 p-2 rounded-lg mt-3'>
                <ScrollableDates selected='Today' dates={dates} />
              </div>
              <div className='flex items-center flex-wrap gap-2 mt-3 mb-6'>
                {['09.00 am', '10.00 am', '11.00 am', '12.00 pm', '01.00 pm', '02.00 pm', '03.00 pm', '04.00 pm'].map((time) => (
                  <button key={time} className='bg-neutral-100 py-1 px-3 rounded-full'>
                    {time}
                  </button>
                ))}
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-lg font-medium'>Car Details</p>
                <p>BMW 7 Series</p>
              </div>
              <div className='rounded-lg overflow-hidden h-36 bg-neutral-200'>
                <Image src={CAR} width={1280} height={960} className='w-full h-full object-contain' alt='' />
              </div>
            </div>
            <div className='p-4'>
              <Button onClick={handleClose} className='p-3 w-full'>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const dates = ['Today', 'Tomorrow', 'Wed, 04 Sept', 'Wed, 05 Sept', 'Wed, 06 Sept', 'Wed, 07 Sept', 'Wed, 08 Sept'];
