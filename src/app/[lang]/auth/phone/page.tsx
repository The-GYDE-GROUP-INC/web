import { Phone } from "@/components/icons/Phone";
import AuthLayout from "@/layout/AuthLayout";
import { useTranslations } from "next-intl";
import { PhoneForm } from "@/app/[lang]/auth/phone/includes/PhoneForm";

export default function PhoneLogin() {
  const t = useTranslations("phone");
  return (
    <AuthLayout
      showBack
      title={t("title")}
      subtitle={t("subtitle")}
      icon={<Phone size={32} className="text-dark-grey mt-8" />}
    >
      <PhoneForm />
    </AuthLayout>
  );
}
