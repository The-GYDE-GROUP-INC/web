'use client';

import { FC, SVGProps } from 'react';

interface PlusProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Plus: FC<PlusProps> = ({ size = 16, ...props }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props} width={size} height={size} viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z'
      />
    </svg>
  );
};
