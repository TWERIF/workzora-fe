import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import codeOfConductEn from "../public/locales/en/codeOfConduct.json";
import comingSoonEn from "../public/locales/en/comingSoon.json";
import commonEn from "../public/locales/en/common.json";
import copyrightPolicyEn from "../public/locales/en/copyrightPolicy.json";
import feesEn from "../public/locales/en/fees.json";
import codeOfConductUk from "../public/locales/uk/codeOfConduct.json";
import comingSoonUk from "../public/locales/uk/comingSoon.json";
import commonUk from "../public/locales/uk/common.json";
import copyrightPolicyUk from "../public/locales/uk/copyrightPolicy.json";
import feesUk from "../public/locales/uk/fees.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: commonEn, codeOfConduct: codeOfConductEn, fees: feesEn, copyrightPolicy: copyrightPolicyEn, comingSoon: comingSoonEn },
    uk: { common: commonUk, codeOfConduct: codeOfConductUk, fees: feesUk, copyrightPolicy: copyrightPolicyUk, comingSoon: comingSoonUk },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
