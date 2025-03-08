import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: {
    mode: "always",
    prefixes: {
      en: "/en",
      de: "/de",
    },
  },
  pathnames: {
    "/": "/",
    "/organization": {
      en: "/organization",
      de: "/organisation",
    },
  },
});
