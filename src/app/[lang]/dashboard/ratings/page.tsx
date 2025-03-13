import { Button } from '@/components/Button';
import { BankCard } from '@/components/icons/BankCard';
import { Star } from '@/components/icons/Star';
import { FeedBack } from '@/components/pages/dashboard/rating/FeedBack';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();

  return (
    <>
      <h1 className='text-3xl font-medium font-montreal'>{t('dashboard.ratings')}</h1>
      <div className='py-10 max-w-lg'>
        <div className='group flex items-center justify-between gap-6 p-6 border border-neutral-100 rounded-xl bg-white shadow hover:shadow-md transition-shadow duration-300'>
          {/* Left Section */}
          <div className='flex items-center gap-5'>
            <div className='w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-actual-grey flex items-center justify-center group-hover:scale-105 transition-transform duration-300'>
              <BankCard size={32} className='text-primary' />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-2xl font-semibold text-foreground'>
                Price <span className='text-primary'>$162</span>
              </p>
              <p className='text-base text-muted-foreground'>Paid via Credit or Debit Card</p>
            </div>
          </div>

          {/* Status Badge */}
          <span className='bg-success-subtle text-success text-sm font-semibold px-5 py-2 rounded-full border border-success-light shadow-sm'>Paid</span>
        </div>
        <div className='pb-3 pt-4 pr-3 pl-6 shadow rounded-lg border border-neutral-100 bg-white mt-6'>
          <ol className='relative border-s-2 border-neutral-400'>
            <li className='mb-6 ms-6'>
              <span className='absolute flex items-center justify-center w-4 h-4 border-4 border-neutral-400 bg-neutral-200 rounded-full top-0.5 -left-2 ring-4 ring-[#f6f6f6]' />
              <p className='text-nowrap overflow-hidden text-ellipsis'>1234 W Maple Ave McBee, South Carolina 1234 W Maple Ave McBee, South Carolina</p>
            </li>
            <li className='ms-6'>
              <span className='absolute flex items-center justify-center w-4 h-4 bg-white border-4 border-primary rounded-full -left-2 ring-4 mt-1 ring-[#f6f6f6]' />
              <p className='text-nowrap overflow-hidden text-ellipsis'>1234 W Maple Ave McBee, South Carolina 1234 W Maple Ave McBee, South Carolina</p>
            </li>
          </ol>
        </div>
        <div className='flex items-center justify-between mt-6'>
          <div className='flex gap-3'>
            <div className='w-14 h-14 rounded-full flex-shrink-0 bg-actual-grey' />
            <div>
              <div className='flex items-center gap-2'>
                <p className='text-lg font-medium'>Edward</p>
                <Star className='text-yellow' />
                <p className='text-lg font-medium'>4.8</p>
              </div>
              <div className='flex items-center gap-3'>
                <p>BMW 7 Series</p>
                <p>B-KB-8311</p>
              </div>
            </div>
          </div>
          <Button type='button' className='p-3 px-6'>
            Details
          </Button>
        </div>
        <FeedBack />
      </div>
    </>
  );
}
