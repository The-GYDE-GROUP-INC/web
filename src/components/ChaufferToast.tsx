import Image, { StaticImageData } from 'next/image';
import PLACEHOLDER_IMAGE from '@/assets/images/profile/image.png';

interface ChaufferToastProps {
  open?: boolean;
  onClose?: () => void;
  title: string;
  description: string;
  image: StaticImageData;
  time: string;
}

export const ChaufferToast = ({ open, title, description, image, time }: ChaufferToastProps) => {
  return (
    open && (
      <div className={'w-full max-w-sm p-3.5 bg-neutral-50 rounded-xl shadow fixed border border-neutral-200 top-0 z-20 right-0 m-4'}>
        <div className='flex gap-2.5'>
          <Image className='w-10 h-10 rounded-lg' src={image || PLACEHOLDER_IMAGE} alt='' width={688} height={688} />
          <div className='text-sm font-normal'>
            <div className='flex items-center justify-between'>
              <span className='mb-1 text-sm font-semibold text-neutral-600'>{title}</span>
              <span className='text-xs text-neutral-400'>{time}</span>
            </div>
            <div className='mb-2 text-sm font-normal'>{description}</div>
          </div>
        </div>
      </div>
    )
  );
};
