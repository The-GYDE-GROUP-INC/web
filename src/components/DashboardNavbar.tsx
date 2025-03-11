'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import LOGO from '@/assets/images/logo/logo.png';

interface Props {
  toggleDrawer?: () => void;
}

export const DashboardNavbar = ({ toggleDrawer }: Props) => {
  const ref = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  useOutsideClick({
    ref,
    handler() {
      setOpenDropdown(false);
    },
  });

  return (
    <nav className='bg-white shadow relative z-20'>
      <div className='flex flex-wrap items-center justify-between p-4'>
        <div className='flex items-center gap-4'>
          <button type='button' className='flex items-center flex-shrink-0 w-10 h-10 justify-center text-neutral-500' onClick={toggleDrawer}>
            <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h15M1 7h15M1 13h15' />
            </svg>
          </button>
          <Link href='/dashboard' className='flex items-center space-x-3'>
            <Image src={LOGO} className={'mx-auto w-20 h-auto'} width={205} height={81} alt={'Gyde'} />
          </Link>
        </div>
        <div ref={ref} className='relative'>
          <button onClick={() => setOpenDropdown(!openDropdown)} type='button' className='flex text-sm bg-gray-800 rounded-full md:me-0'>
            <span className='sr-only'>Open user menu</span>
            <Image width={1800} height={1009} className='w-8 h-8 rounded-full' src='/assets/images/profile-auth.png' alt='user photo' />
          </button>
          <div className={(openDropdown ? '' : 'hidden') + ' z-50 absolute right-1 mt-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow'}>
            <div className='px-4 py-3'>
              <span className='block text-sm text-gray-900'>Bonnie Green</span>
              <span className='block text-sm text-gray-500 truncate dark:text-gray-400'>name@flowbite.com</span>
            </div>
            <div className='py-2'>
              <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                Dashboard
              </a>
              <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                Settings
              </a>
              <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                Earnings
              </a>
              <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
