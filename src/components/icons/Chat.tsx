'use client';

import { FC, SVGProps } from 'react';

interface ChatProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Chat: FC<ChatProps> = ({ size = 16, ...props }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props} width={size} height={size} viewBox='0 0 29 28' fill='none'>
      <path
        d='M9.58301 13.9999H9.59468M14.2497 13.9999H14.2613M18.9163 13.9999H18.928M9.46634 23.3332C11.693 24.4755 14.2544 24.7848 16.689 24.2056C19.1236 23.6264 21.2713 22.1967 22.7451 20.1741C24.2188 18.1515 24.9217 15.6691 24.727 13.1741C24.5324 10.6791 23.453 8.33569 21.6835 6.56612C19.9139 4.79654 17.5705 3.71719 15.0755 3.52254C12.5805 3.3279 10.0981 4.03078 8.07547 5.50451C6.05287 6.97825 4.62315 9.12592 4.04393 11.5605C3.46472 13.9951 3.77411 16.5566 4.91634 18.7832L2.58301 25.6666L9.46634 23.3332Z'
        stroke='currentColor'
        strokeWidth='2.338'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
