'use client';

import { cn } from '@/utils';
import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'outlined' | 'shadow'; // Add style variations
}

export function Card({ children, variant = 'default', className = '', ...props }: CardProps) {
  const variants = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-white border border-gray-300',
    shadow: 'bg-white shadow-md',
  };

  return (
    <div className={cn('p-6 rounded-lg transition-all', variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
