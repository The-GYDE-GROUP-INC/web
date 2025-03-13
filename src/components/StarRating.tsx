'use client';

import { useState } from 'react';
import { Star } from '@/components/icons/Star';

interface Props {
  max?: number;
  onChange: (rating: number) => void;
  value: number;
}

export default function StarRating({ max = 5, onChange, value }: Props) {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className='flex space-x-1'>
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={`h-10 w-10 cursor-pointer transition-colors ${i < (hoveredRating || value) ? 'text-yellow' : 'text-gray-300'}`}
          onMouseEnter={() => setHoveredRating(i + 1)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => onChange(i + 1)}
        />
      ))}
    </div>
  );
}
