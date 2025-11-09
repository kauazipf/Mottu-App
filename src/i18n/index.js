import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import pt from './locales/pt.json';
import es from './locales/es.json';

const locales = RNLocalize.getLocales();
const fallback = { languageTag: 'pt', isRTL: false };
const { languageTag } = locales[0] || fallback;

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: languageTag.startsWith('es') ? 'es' : 'pt',
    fallbackLng: 'pt',
    resources: { pt: { translation: pt }, es: { translation: es } },
    interpolation: { escapeValue: false }
  });

export default i18n;
