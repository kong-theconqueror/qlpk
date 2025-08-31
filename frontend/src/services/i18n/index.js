import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import vn from "./langs/vn";
import en from "./langs/en";

const resources = {
    vn, en
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vn',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;