'use client';

import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface EmailValues {
  email: string;
}

function EmailForm() {
  const t = useTranslations();
  const { push } = useRouter();

  const initialValues: EmailValues = { email: '' };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('onboarding.email.invalid-email')).required(t('onboarding.email.email-required')),
  });

  const handleSubmit = (values: EmailValues) => {
    console.log('Submitted values:', values);
    push('/onboarding/profile');
  };

  return (
    <Formik validateOnBlur validateOnChange initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ touched, errors, isValid, handleChange, handleBlur }) => (
        <Form className='mt-6'>
          <div className='flex flex-col'>
            <label className='font-medium text-[15px] leading-5 mb-2'>{t('email')}</label>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              name='email'
              type='email'
              placeholder={t('onboarding.email.email-placeholder')}
              isError={Boolean(touched.email && errors.email)}
            />
            <ErrorMessage name='email' component='div' className='text-red-500 text-sm mt-1' />
          </div>
          <Button disabled={!isValid} size='md' type='submit' className='mt-[69px] w-full'>
            {t('next')}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default EmailForm;
