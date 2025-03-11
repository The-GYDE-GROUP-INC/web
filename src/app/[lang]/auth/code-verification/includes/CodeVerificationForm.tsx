"use client";

import { useRouter } from "next/navigation";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import OTPInput from "react-otp-input";
import { useTranslations } from "next-intl";

interface FormValues {
  otp: string;
}

export function CodeVerificationForm() {
  const t = useTranslations();
  const { push } = useRouter();
  const initialValues: FormValues = { otp: "" };

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{6}$/, t("code-verification.invalid-otp"))
      .required(t("code-verification.otp-required")),
  });

  const handleSubmit = (values: FormValues) => {
    console.log("Submitted values:", values);
    push("/auth/welcome");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isValid }) => (
        <Form className="mt-6">
          <div className="bg-actual-grey rounded-2xl py-3">
            <OTPInput
              value={values.otp}
              inputStyle={{
                fontSize: "18px",
                flex: 1,
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
              }}
              containerStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
              placeholder="------"
              onChange={(otp) => setFieldValue("otp", otp)}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <ErrorMessage
            name="otp"
            component="div"
            className="text-red-500 text-sm mt-1"
          />

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
