'use client';

import { cn } from '@/utils';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  startIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ isError, startIcon, className, ...props }, ref) => {
  return (
    <div className='relative'>
      {startIcon && <span className='absolute left-[14px] top-[14px] pointer-events-none'>{startIcon}</span>}
      <input
        ref={ref}
        {...props}
        className={cn(
          'border-2 px-4 h-[54px] transition-all bg-actual-grey block rounded-2xl focus:outline-none',
          isError ? 'border-red-500' : 'border-actual-grey',
          startIcon ? 'pl-12' : '',
          className
        )}
      />
    </div>
  );
});

Input.displayName = 'Input';
