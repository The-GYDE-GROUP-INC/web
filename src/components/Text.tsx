'use client';

import { createElement, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';

const variants: Record<string, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-medium',
  h4: 'text-xl font-medium',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs text-gray-500',
};

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
}

const Text = ({ variant, className = '', children, ...props }: TextProps) => {
  return createElement(variant ? variant : 'p', { className: cn(variant && variants[variant], className), ...props }, children);
};

export default Text;
