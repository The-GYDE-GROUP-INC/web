'use client';

import NextTopLoader from 'nextjs-toploader';
import { Tooltip } from 'react-tooltip';
import { ReactNode } from 'react';

export default function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <NextTopLoader height={3} color={'#D0841B'} showSpinner={false} />
      <Tooltip id='tooltip' className='z-[60] !opacity-100 max-w-sm shadow-lg' />
    </>
  );
}
