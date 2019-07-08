import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import zhCN from "./zh_CN";
import en from "./en";

const isProd = process.env.NODE_ENV === "production";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      zhCN: {
        translations: zhCN
      },
      en: {
        translations: en
      }
    },
    fallbackLng: "zhCN",
    lng: "zhCN",
    debug: !isProd,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });
