'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { usePathname } from 'next/navigation';

interface Props {
  item: { title: string; subLinks: Array<{ title: string; href: string }>; icon: ReactNode };
}

export const DashboardCollapse = ({ item }: Props) => {
  const path = usePathname();

  const [open, setOpen] = useState(false);

  return (
    item && (
      <>
        <button
          type='button'
          onClick={() => setOpen(!open)}
          className={'flex items-center p-2 w-full text-base font-normal text-dim-grey rounded-lg transition-all group hover:bg-neutral-100 '}
        >
          {item.icon}
          <span className='flex-1 ml-3 text-left whitespace-nowrap'>{item.title}</span>
          <ChevronDown size={24} className={'transition-all ' + (open ? 'rotate-180' : '')} />
        </button>
        {open && (
          <div className={'py-2 space-y-2 '}>
            {item.subLinks.map(({ href, title }) => (
              <Link
                key={title}
                href={href}
                className={
                  'flex items-center p-2 pl-11 w-full text-base font-normal rounded-lg transition-all group ' +
                  (path === href ? 'text-primary bg-light-primary' : 'text-gray-900 hover:bg-gray-100')
                }
              >
                {title}
              </Link>
            ))}
          </div>
        )}
      </>
    )
  );
};
