"use client";

import { ErrorMessage, Form, Formik } from "formik";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface PhoneLoginValues {
  phone: string;
}

export function PhoneForm() {
  const t = useTranslations();
  const { push } = useRouter();

  const initialValues: PhoneLoginValues = { phone: "" };

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, t("phone.invalid"))
      .required(t("phone.required")),
  });

  const handleSubmit = (values: PhoneLoginValues) => {
    console.log("Submitted values:", values);
    push("/auth/code-verification");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, isValid, handleChange, handleBlur }) => (
        <Form className="mt-6">
          <div className="flex flex-col">
            <label className="font-medium text-[15px] leading-5 mb-2">
              {t("phone.number")}
            </label>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              isError={Boolean(touched.phone && errors.phone)}
              placeholder={t("phone.placeholder")}
              name="phone"
              type="tel"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <Button
            disabled={!isValid}
            size="md"
            type="submit"
            className="mt-[69px] w-full"
          >
            {t("next")}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
