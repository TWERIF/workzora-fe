import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import codeOfConductEn from "../public/locales/en/codeOfConduct.json";
import comingSoonEn from "../public/locales/en/comingSoon.json";
import commonEn from "../public/locales/en/common.json";
import copyrightPolicyEn from "../public/locales/en/copyrightPolicy.json";
import feesEn from "../public/locales/en/fees.json";
import mainEn from "../public/locales/en/main.json";
import codeOfConductUk from "../public/locales/uk/codeOfConduct.json";
import comingSoonUk from "../public/locales/uk/comingSoon.json";
import commonUk from "../public/locales/uk/common.json";
import copyrightPolicyUk from "../public/locales/uk/copyrightPolicy.json";
import feesUk from "../public/locales/uk/fees.json";
import mainUk from "../public/locales/uk/main.json";

import profileEn from "../public/locales/en/profile.json";
import profileUk from "../public/locales/uk/profile.json";

import paymentEn from "../public/locales/en/payment.json";
import paymentUk from "../public/locales/uk/payment.json";

import chatEn from "../public/locales/en/chat.json";
import chatUk from "../public/locales/uk/chat.json";

import paymentDataEn from "../public/locales/en/payment-data.json";
import paymentDataUk from "../public/locales/uk/payment-data.json";

import discussionEn from "../public/locales/en/discussion.json";
import discussionUk from "../public/locales/uk/discussion.json";

import findWorkEn from "../public/locales/en/findWork.json";
import findWorkUk from "../public/locales/uk/findWork.json";

import financesEn from "../public/locales/en/finances.json";
import financesUk from "../public/locales/uk/finances.json";

import additionsEn from "../public/locales/en/additions.json";
import additionsUk from "../public/locales/uk/additions.json";

import createProjectEn from "../public/locales/en/createProject.json";
import createProjectUk from "../public/locales/uk/createProject.json";

import proEn from "../public/locales/en/pro.json";
import proUk from "../public/locales/uk/pro.json";

import topFreelancersEn from "../public/locales/en/topFreelancers.json";
import topFreelancersUk from "../public/locales/uk/topFreelancers.json";

import gettingStartedEn from "../public/locales/en/getting-started.json";
import gettingStartedUk from "../public/locales/uk/getting-started.json";

import createAccountEn from "../public/locales/en/createAccount.json";
import createAccountUk from "../public/locales/uk/createAccount.json";

import helpEn from "../public/locales/en/help.json";
import helpUk from "../public/locales/uk/help.json";

import footerEn from "../public/locales/en/footer.json";
import footerUk from "../public/locales/uk/footer.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: commonEn,
      codeOfConduct: codeOfConductEn,
      fees: feesEn,
      copyrightPolicy: copyrightPolicyEn,
      comingSoon: comingSoonEn,
      main: mainEn,
      profile: profileEn,
      payment: paymentEn,
      chat: chatEn,
      "payment-data": paymentDataEn,
      discussion: discussionEn,
      findWork: findWorkEn,
      finances: financesEn,
      additions: additionsEn,
      createProject: createProjectEn,
      pro: proEn,
      topFreelancers: topFreelancersEn,
      "getting-started": gettingStartedEn,
      createAccount: createAccountEn,
      help: helpEn,
      footer: footerUk
    },
    uk: {
      common: commonUk,
      codeOfConduct: codeOfConductUk,
      fees: feesUk,
      copyrightPolicy: copyrightPolicyUk,
      comingSoon: comingSoonUk,
      main: mainUk,
      profile: profileUk,
      payment: paymentUk,
      chat: chatUk,
      "payment-data": paymentDataUk,
      discussion: discussionUk,
      findWork: findWorkUk,
      finances: financesUk,
      additions: additionsUk,
      createProject: createProjectUk,
      pro: proUk,
      topFreelancers: topFreelancersUk,
      "getting-started": gettingStartedUk,
      createAccount: createAccountUk,
      help: helpUk,
      footer: footerEn
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
