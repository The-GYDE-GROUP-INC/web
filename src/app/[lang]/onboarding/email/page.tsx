import AuthLayout from "@/layout/AuthLayout";
import { Invite } from "@/components/icons/Invite";
import EmailForm from "@/app/[lang]/onboarding/email/includes/EmailForm";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("onboarding.email");

  return (
    <AuthLayout
      title={t("title")}
      subtitle={t("subtitle")}
      icon={<Invite size={32} className="text-dark-grey mt-8" />}
    >
      <EmailForm />
    </AuthLayout>
  );
}
