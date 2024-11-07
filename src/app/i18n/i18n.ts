import { Platform, NativeModules } from 'react-native'

import i18n, {
  LanguageDetectorAsyncModule,
  Services,
  InitOptions,
} from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en } from './languages'

import { ELanguages } from './types'

const DEFAULT_LANG = ELanguages.en

const getDeviceLang = () => {
  const appLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier

  return appLanguage.search(/-|_/g) !== -1
    ? appLanguage.slice(0, 2)
    : appLanguage
}

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: (
    _services: Services,
    _detectorOptions: object,
    _i18nextOptions: InitOptions,
  ) => {},
  detect: callback => {
    const deviceLang = getDeviceLang()

    let lang = deviceLang

    if (!Object.keys(resources).includes(lang)) {
      lang = DEFAULT_LANG
    }

    callback(lang)
  },
  cacheUserLanguage: async () => {},
}
export const defaultNS = DEFAULT_LANG
export const resources = {
  en: { translation: en },
}

i18n.use(initReactI18next).use(languageDetector).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: DEFAULT_LANG,
})

export default i18n
