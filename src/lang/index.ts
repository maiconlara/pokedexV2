import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt_BR from "./pt_BR.json";

i18n.use(initReactI18next).init({
    resources: {
        pt_BR: {
            translation: pt_BR,
        },
    },
    fallbackLng: "pt_BR",
    returnObjects: true,
    interpolation: {
        escapeValue: false,
    },

    lng: "pt_BR",
});

export { default } from "i18next";