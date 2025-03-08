'use client';

import { DashboardCollapse } from '@/components/DashboardCollapse';
import { Car } from '@/components/icons/Car';
import { useTranslations } from 'next-intl';

interface Props {
  open?: boolean;
  onClose?: () => void;
}

export const Drawer = ({ open, onClose }: Props) => {
  const t = useTranslations();

  const links = [
    {
      title: t('dashboard.rides'),
      icon: <Car size={24} />,
      subLinks: [
        {
          title: t('dashboard.upcoming-rides'),
          href: '/dashboard/rides/upcoming',
        },
        {
          title: t('dashboard.past-rides'),
          href: '/dashboard/rides/past',
        },
        {
          title: t('dashboard.canceled-rides'),
          href: '/dashboard/rides/canceled',
        },
      ],
    },
  ];

  return (
    <div className={'fixed top-0 pt-20 left-0 z-10 h-screen p-4 overflow-y-auto transition-transform bg-white w-72 shadow-md ' + (open ? '' : '-translate-x-full')}>
      <button
        onClick={onClose}
        type='button'
        className='text-gray-400 bg-transparent md:hidden hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center'
      >
        <svg className='w-3 h-3' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
        </svg>
        <span className='sr-only'>Close menu</span>
      </button>
      {links.map((item) => (
        <DashboardCollapse key={item.title} item={item} />
      ))}
    </div>
  );
};
