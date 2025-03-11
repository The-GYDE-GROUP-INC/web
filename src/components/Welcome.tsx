import { Card } from '@/components/Card';
import Text from '@/components/Text';
import { Button } from '@/components/Button';
import { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle: string;
  welcomeIcon: ReactNode;
  buttonText: ReactNode;
  buttonUrl?: string;
}

export const Welcome = ({ title, buttonText, buttonUrl, subtitle, welcomeIcon }: Props) => {
  return (
    <div className='flex items-center min-h-screen py-20 justify-center bg-neutral-100'>
      <Card variant={'shadow'} className='w-96 !pt-14 p-6'>
        {welcomeIcon}
        <Text variant='h3' className={'text-dark-grey text-center mt-5 mb-2'}>
          {title}
        </Text>
        <Text className={'text-light-grey text-center'}>{subtitle}</Text>
        <Button href={buttonUrl} variant='primary' className={'w-full mt-32 py-3 px-3'}>
          {buttonText}
        </Button>
      </Card>
    </div>
  );
};
