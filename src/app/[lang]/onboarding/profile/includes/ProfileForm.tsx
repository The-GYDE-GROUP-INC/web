'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import Image from 'next/image';
import Text from '@/components/Text';
import { Input } from '@/components/Input';
import { User } from '@/components/icons/User';
import { Pencil } from '@/components/icons/Pencil';
import { Camera } from '@/components/icons/Camera';
import { Button } from '@/components/Button';
import { cn } from '@/utils';
import { ChevronLeft } from '@/components/icons/ChevronLeft';
import { Card } from '@/components/Card';

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  companyName: string;
  profile: File | null;
};

const FIELD_MAPPING = {
  'onboarding.profile.firstName': 'firstName',
  'onboarding.profile.lastName': 'lastName',
  'onboarding.profile.companyName': 'companyName',
} as const;

function ProfileForm() {
  const t = useTranslations();
  const { back, push } = useRouter();

  const initialValues: ProfileFormValues = {
    firstName: '',
    lastName: '',
    companyName: '',
    profile: null,
  };

  // Define form validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('onboarding.profile.firstName-error')),
    lastName: Yup.string().required(t('onboarding.profile.lastName-error')),
    companyName: Yup.string().required(t('onboarding.profile.companyName-error')),
    profile: Yup.mixed()
      .nullable()
      .test('fileType', t('onboarding.profile.profile-error'), (value) => {
        return !value || (value instanceof File && value.type.startsWith('image/'));
      }),
  });

  const handleSubmit = (values: ProfileFormValues) => {
    push('/onboarding/welcome');
    console.log('Form Data', values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ setFieldValue, handleBlur, values, touched, errors, handleChange, isValid }) => (
        <Form>
          <div className='flex items-center min-h-screen py-20 justify-center bg-neutral-100'>
            <Card variant='shadow' className='w-96 overflow-hidden !pt-0 !px-0 pb-6'>
              {/* Profile section with background and avatar */}

              <div className='relative flex items-end pb-10 justify-center bg-profile-auth h-52 bg-cover bg-no-repeat after:absolute after:inset-0 after:bg-black/30'>
                <button type='button' onClick={back} className='absolute text-white z-10 top-10 left-4 flex items-center gap-2'>
                  <ChevronLeft size={24} />
                  {t('profile')}
                </button>
                <div className={cn('relative z-10 w-[90px] h-[90px] flex items-center justify-center rounded-full', values.profile ? '' : 'border bg-actual-grey')}>
                  {values.profile ? (
                    <Image width={90} height={90} className='w-full h-full object-cover rounded-full' src={URL.createObjectURL(values.profile)} alt='Profile' />
                  ) : (
                    <User size={24} className='text-dark' />
                  )}
                  <label
                    htmlFor='profile'
                    className={cn(
                      'absolute -bottom-3 -right-3 h-10 w-10 cursor-pointer flex items-center justify-center rounded-full shadow-custom border transition-all active:scale-95',
                      values.profile ? 'bg-light-primary text-primary hover:bg-primary hover:text-white' : 'bg-actual-grey text-gray-400 hover:bg-white border-divider'
                    )}
                  >
                    {values.profile ? <Pencil size={16} /> : <Camera size={16} />}
                    <input
                      accept='image/*'
                      id='profile'
                      type='file'
                      hidden
                      onBlur={handleBlur}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        setFieldValue('profile', file);
                      }}
                    />
                  </label>
                </div>
                <ErrorMessage name='profile' component='p' className='text-red-500 text-sm mt-2' />
              </div>

              {/* Profile Form */}
              <div className='pt-6 px-6'>
                <Text variant='h3' className='text-dark-grey'>
                  {t('onboarding.profile.your-profile')}
                </Text>
                <Text className='text-light-grey'>{t('onboarding.profile.profile-subtitle')}</Text>

                <div className='space-y-4 mt-6'>
                  {(Object.keys(FIELD_MAPPING) as Array<keyof typeof FIELD_MAPPING>).map((field) => {
                    const fieldName = FIELD_MAPPING[field];
                    return (
                      <div key={field}>
                        <label className='block text-dark-grey mb-2 text-[15px] font-medium' htmlFor={fieldName}>
                          {t(field)}
                        </label>
                        <Input
                          id={fieldName}
                          className='w-full'
                          name={fieldName}
                          type='text'
                          placeholder={t(`${field}-placeholder`)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isError={Boolean(touched[fieldName] && errors[fieldName])}
                        />
                        <ErrorMessage name={fieldName} component='div' className='text-red-500 text-sm' />
                      </div>
                    );
                  })}
                </div>

                <Button disabled={!isValid} size='md' type='submit' className='mt-[69px] w-full'>
                  {t('next')}
                </Button>
              </div>
            </Card>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ProfileForm;
