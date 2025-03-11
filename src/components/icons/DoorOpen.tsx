'use client';

import { FC, SVGProps } from 'react';

interface DoorOpenProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const DoorOpen: FC<DoorOpenProps> = ({ size = 16, ...props }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props} width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <path
        d='M13 3.99995H16C16.5304 3.99995 17.0391 4.21067 17.4142 4.58574C17.7893 4.96081 18 5.46952 18 5.99995V20M2 20H5M5 20L11.758 21.689C11.9054 21.7257 12.0592 21.7284 12.2078 21.6968C12.3564 21.6653 12.4958 21.6003 12.6155 21.5068C12.7352 21.4133 12.8321 21.2938 12.8987 21.1573C12.9653 21.0207 13 20.8708 13 20.719V4.56195C12.9998 4.25813 12.9304 3.95735 12.797 3.68437C12.6637 3.41138 12.4699 3.17237 12.2303 2.98547C11.9908 2.79857 11.7118 2.66869 11.4146 2.60571C11.1174 2.54272 10.8098 2.54828 10.515 2.62195L6.515 3.62195C6.08232 3.73011 5.69821 3.97978 5.42371 4.33128C5.1492 4.68279 5.00007 5.11596 5 5.56195V20ZM13 20H22M10 12V12.01'
        stroke='currentColor'
        strokeWidth='1.37143'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
