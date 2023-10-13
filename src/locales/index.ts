import { createI18n } from "vue-i18n";
import en from "@/locales/locale/en.json";
import no from "@/locales/locale/no.json";
import nn from "@/locales/locale/nn.json";
import Constants from "@/utils/constants";

import { toLower } from "lodash";

// define regional datetime formats
const dateTimeFormats = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  },
  se: {
    short: {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  },
  no: {
    short: {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  },
  nn: {
    short: {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  },
  dk: {
    short: {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  }
};

function serverLocationLanguage() {
  const countryCode = `${import.meta.env.VITE_APP_TID_COUNTRY_CODE}`;
  let returnLang = "no";
  if (countryCode === Constants.ApplicationConstants.CountryCodes.Norway) {
    returnLang = "no";
  }else{
    returnLang  = "en";
  }    

  return returnLang;
}

const messages: any = {
  en,
  no,
  nn
};

const i18n: any = createI18n({
  locale: serverLocationLanguage(),
  fallbackLocale: import.meta.env.VITE_APP_TID_FALLBACK_LOCALE,
  messages,
  allowComposition: true,
  dateTimeFormats,
  silentTranslationWarn: true
});

/**
 *
 * @param key translate test
 */
const translate = (key: string) => {
  if (!key) {
    return "";
  }
  return i18n.global.t(key);
};



const resolveLocale = (locale: string) => {
  let lang = "";
  switch (toLower(locale)) {
    case "en-us":
    case "en-au":
    case "en-gb":
      lang = "en";
      break;
    case "no":
    case "nb-no":
    case "nb":
      lang = "no";
      break;
    case "nn":
    case "nn-no":
      lang = "nn";
      break;
      
    default:
      lang = "en";
  }
  return lang;
};

export { i18n, translate, resolveLocale };
