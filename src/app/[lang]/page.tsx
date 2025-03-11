import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/components/Card";
import Text from "@/components/Text";
import { Button } from "@/components/Button";
import { Apple } from "@/components/icons/Apple";
import { Google } from "@/components/icons/Google";
import { Facebook } from "@/components/icons/Facebook";
import Link from "next/link";
import LOGO from "@/assets/images/logo/logo.png";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="flex items-center min-h-screen py-20 justify-center bg-neutral-100">
      <Card variant="shadow" className="w-96 overflow-hidden !pt-0 !px-0 pb-6">
        <Image
          src={"/assets/images/landing.png"}
          className={"h-64 object-cover w-full"}
          width={1024}
          height={1024}
          alt={"Gyde"}
        />
        <div className="pt-6 px-6">
          <Image
            src={LOGO}
            className={"mx-auto w-32"}
            width={205}
            height={81}
            alt={"Gyde"}
          />
          <Text className={"font-medium text-light-grey text-center mt-5"}>
            {t("landing.title")}
          </Text>

          <Button href={"/auth/phone"} className={"w-full mt-14 py-3 px-3"}>
            {t("landing.continue-phone")}
          </Button>

          <div className={"grid grid-cols-3 gap-4 mt-4"}>
            <Button
              className={"h-[54px] flex items-center justify-center"}
              variant={"primary-outline"}
            >
              <Apple size={20} />
            </Button>{" "}
            <Button
              className={"h-[54px] flex items-center justify-center"}
              variant={"primary-outline"}
            >
              <Google size={20} />
            </Button>
            <Button
              className={"h-[54px] flex items-center justify-center"}
              variant={"primary-outline"}
            >
              <Facebook className={"text-primary"} size={20} />
            </Button>
          </div>
          <Text
            className={"text-center !text-dim-grey mt-12 text-base font-normal"}
          >
            {t("landing.termsA")}{" "}
            <Link href={"#"} className={"text-primary"}>
              {t("landing.termsB")}
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
