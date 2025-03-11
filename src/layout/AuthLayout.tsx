'use client';

import { Card } from '@/components/Card';
import { ChevronLeft } from '@/components/icons/ChevronLeft';
import Text from '@/components/Text';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
  subtitle: string;
  icon?: ReactNode;
  children: ReactNode;
  showBack?: boolean;
}

export default function AuthLayout({ title, icon, children, subtitle, showBack }: Props) {
  const { back } = useRouter();

  return (
    <div className='flex items-center min-h-screen py-20 justify-center bg-neutral-100'>
      <Card variant={'shadow'} className='w-96 p-6'>
        <button className='h-6'>{showBack && <ChevronLeft onClick={back} className='text-dark-grey' size={24} />}</button>
        <div className='h-8'>{icon}</div>
        <Text variant='h3' className='text-dark-grey mt-6'>
          {title}
        </Text>
        <Text className='font-medium text-light-grey'>{subtitle}</Text>
        {children}
      </Card>
    </div>
  );
}
