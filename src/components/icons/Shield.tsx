'use client';

import { FC, SVGProps } from 'react';

interface ShieldProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Shield: FC<ShieldProps> = ({ size = 16, ...props }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props} width={size} height={size} viewBox='0 0 29 28' fill='none'>
      <path
        d='M14.7494 25.6666C14.7494 25.6666 24.0827 20.9999 24.0827 13.9999V5.83325L14.7494 2.33325M14.7494 25.6666C14.7494 25.6666 5.41602 20.9999 5.41602 13.9999V5.83325L14.7494 2.33325M14.7494 25.6666V2.33325'
        stroke='currentColor'
        strokeWidth='2.338'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
