import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        lng: localStorage.getItem("language") || "en",
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        detection: {
            order: ["querystring", "cookie", "localStorage", "navigator"],
            caches: ["cookie"],
        },
        react: {
            useSuspense: false,
        },
    });
