import { useTranslations } from "next-intl";
import { Welcome } from "@/components/Welcome";
import { Welcome2 } from "@/components/icons/Welcome2";

export default function Page() {
  const t = useTranslations();
  return (
    <Welcome
      buttonUrl="/dashboard/rides/upcoming"
      buttonText={t("continue")}
      subtitle={t("welcome.subtitle2")}
      title={t("welcome.hi", { name: "Usama" })}
      welcomeIcon={<Welcome2 size={111} className="text-primary mx-auto" />}
    />
  );
}
