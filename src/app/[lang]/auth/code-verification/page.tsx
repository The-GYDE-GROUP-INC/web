import { useTranslations } from "next-intl";
import { Lock } from "@/components/icons/Lock";
import AuthLayout from "@/layout/AuthLayout";
import { CodeVerificationForm } from "@/app/[lang]/auth/code-verification/includes/CodeVerificationForm";

export default function Page() {
  const t = useTranslations("code-verification");

  return (
    <AuthLayout
      showBack
      title={t("title")}
      subtitle={t("subtitle", { number: "+65 8123 4567" })}
      icon={<Lock size={32} className="text-dark-grey mt-8" />}
    >
      <CodeVerificationForm />
    </AuthLayout>
  );
}
