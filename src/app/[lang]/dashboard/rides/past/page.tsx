import { Button } from '@/components/Button';
import { RideCard } from '@/components/pages/dashboard/rides/RideCard';
import { EmptyRides } from '@/components/EmptyRides';
import { useTranslations } from 'next-intl';

function Page() {
  const t = useTranslations();

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-medium font-montreal'>{t('dashboard.past-rides')}</h1>

        <Button href='/dashboard/rides/book-ride' className='py-3 px-6'>
          {t('dashboard.book-ride')}
        </Button>
      </div>

      {rides.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-8'>
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      ) : (
        <EmptyRides title='No upcoming rides' message='You have no upcoming rides.' />
      )}
    </>
  );
}

export default Page;

const rides = [
  {
    id: 1,
    location: '1400 S Lake Shore Dr, Chicago, IL',
    date: '24 Jun, 11.00 am',
    type: 'One way',
  },
  {
    id: 2,
    location: '233 Wacker Dr, Chicago, IL',
    date: '12 Jul, 3.30 pm',
    type: 'Round trip',
  },
  {
    id: 3,
    location: '500 N Michigan Ave, Chicago, IL',
    date: '01 Aug, 9.15 am',
    type: 'One way',
  },
];
