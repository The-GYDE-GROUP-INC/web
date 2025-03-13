'use client';

import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StarRating from '@/components/StarRating';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useTranslations } from 'next-intl';

const feedbackSchema = Yup.object().shape({
  rating: Yup.number().min(1, 'Please give at least 1 star rating').required('Rating is required'),
  comments: Yup.string().max(150, 'Comments cannot exceed 150 characters').optional(),
});

export const FeedBack = () => {
  const t = useTranslations();
  return (
    <Formik
      initialValues={{ rating: 0, comments: '' }}
      validationSchema={feedbackSchema}
      onSubmit={(values) => {
        console.log('Submitted values:', values);
      }}
    >
      {({ setFieldValue, values, handleBlur, handleChange, touched, errors }) => (
        <Form className='space-y-4 my-10'>
          {/* Star Rating Field */}
          <div>
            <label className='block text-xl mb-4 font-medium text-gray-700'>How was your ride?</label>
            <StarRating value={values.rating} onChange={(value: number) => setFieldValue('rating', value)} max={5} />
            <ErrorMessage name='rating' component='div' className='text-red-500 text-sm mt-1' />
            <p className='mt-4 text-neutral-600'>Your feedback is anonymus</p>
          </div>

          {/* Comments Field (Hidden Until Rating is Given) */}
          {values.rating > 0 && (
            <div className='w-full'>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name='comments'
                type='text'
                placeholder={'Leave a comment'}
                className='w-full'
                isError={Boolean(touched.comments && errors.comments)}
              />
              <ErrorMessage name='comments' component='div' className='text-red-500 text-sm mt-1' />
            </div>
          )}

          {/* Submit Button (Hidden Until Rating is Given) */}
          {values.rating > 0 && (
            <Button type='submit' className='px-4 py-3 w-full'>
              {t('submit')}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};
