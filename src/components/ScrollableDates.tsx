'use client';

import { ChevronLeft } from '@/components/icons/ChevronLeft';
import { useRef } from 'react';

interface Props {
  dates: string[];
  selected: string;
  onClick?: (val: string) => void;
}

export const ScrollableDates = ({ dates, onClick, selected }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 150; // Adjust scroll distance
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className='flex items-center gap-2'>
      <button onClick={() => scroll('left')}>
        <ChevronLeft />
      </button>
      <div ref={scrollRef} className='flex items-center gap-1 overflow-x-auto hide-scrollbar scroll-smooth'>
        {dates.map((title) => (
          <button
            onClick={() => onClick?.(title)}
            key={title}
            className={
              'py-1 px-3 rounded transition whitespace-nowrap ' + (selected === title ? 'bg-primary text-white' : 'active:bg-dim-primary/50 bg-neutral-100 hover:bg-light-primary')
            }
          >
            {title}
          </button>
        ))}
      </div>
      <button onClick={() => scroll('right')}>
        <ChevronLeft className='rotate-180' />
      </button>
    </div>
  );
};
