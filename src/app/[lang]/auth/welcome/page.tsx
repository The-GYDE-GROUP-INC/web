import { Welcome } from "@/components/icons/Welcome";
import { Welcome as WelcomeComponent } from "@/components/Welcome";
import { useTranslations } from "next-intl";

function Page() {
  const t = useTranslations();

  return (
    <WelcomeComponent
      buttonUrl="/onboarding/email"
      buttonText={t("continue")}
      subtitle={t("welcome.subtitle")}
      title={t("welcome.title")}
      welcomeIcon={<Welcome size={100} className="text-primary mx-auto" />}
    />
  );
}

export default Page;
