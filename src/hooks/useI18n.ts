import { useMemo } from 'react';
import { useUIStore } from '../stores/uiStore';

// Import translations
import enTranslations from '../i18n/en.json';
import arTranslations from '../i18n/ar.json';

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

export const useI18n = () => {
  const { language } = useUIStore();

  const t = useMemo(() => {
    const currentTranslations = translations[language];
    
    return (key: string, params?: Record<string, string | number>) => {
      const keys = key.split('.');
      let value: any = currentTranslations;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Fallback to English if translation not found
          let fallbackValue: any = translations.en;
          for (const fallbackKey of keys) {
            if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
              fallbackValue = fallbackValue[fallbackKey];
            } else {
              return key; // Return key if no translation found
            }
          }
          value = fallbackValue;
          break;
        }
      }
      
      if (typeof value === 'string' && params) {
        // Replace parameters in the string
        return Object.entries(params).reduce((str, [param, replacement]) => {
          return str.replace(new RegExp(`{${param}}`, 'g'), String(replacement));
        }, value);
      }
      
      return value || key;
    };
  }, [language]);

  return {
    t,
    language,
    isRTL: language === 'ar',
  };
};
