import { EmptyCar } from '@/components/icons/EmptyCar';

interface Props {
  title: string;
  message: string;
}

export const EmptyRides = ({ message, title }: Props) => {
  return (
    <div className='flex h-full w-full flex-col items-center gap-4 justify-center'>
      <EmptyCar className='text-primary' size={50} />
      <h5 className='text-xl font-medium font-montreal'>{title}</h5>
      <p className='font-medium font-helvetica'>{message}</p>
    </div>
  );
};
