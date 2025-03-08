'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/utils';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  'primary-outline': 'border border-dim-primary bg-light-primary text-primary hover:bg-primary hover:text-white',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'p-3 text-base',
  lg: 'px-5 py-3 text-lg',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  href?: string;
}

export function Button({ children, variant = 'primary', size, isLoading = false, disabled = false, className = '', href, ...props }: ButtonProps) {
  const buttonClass = cn(
    'normal-case font-medium rounded-xl transition-all flex items-center justify-center gap-2',
    variants[variant],
    size && sizes[size],
    disabled || isLoading ? 'bg-neutral-400 text-neutral-300 pointer-events-none' : '',
    className
  );

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {isLoading && <span className='animate-spin w-4 h-4 border-2 border-t-white border-gray-300 rounded-full'></span>}
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} disabled={disabled || isLoading} {...props}>
      {isLoading && <span className='animate-spin w-4 h-4 border-2 border-t-white border-gray-300 rounded-full'></span>}
      {children}
    </button>
  );
}
