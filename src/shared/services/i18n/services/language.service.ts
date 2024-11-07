import { NativeModules, Platform } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import i18next from 'i18next'

import { ELanguages } from '@/app/i18n'

export class Language {
  private static KEY = 'language'
  private static storage = AsyncStorage

  public static DEFAULT_LANGUAGE = ELanguages.en

  // Get device language
  private static getDeviceLang() {
    const appLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier

    return appLanguage.slice(0, 2)
  }

  private static async getLocalStorageLanguage() {
    return this.storage.getItem(this.KEY)
  }

  // Get app language
  static async getLanguage(): Promise<ELanguages> {
    const localLangauge = await this.getLocalStorageLanguage()

    // If local storage lang set
    if (localLangauge) {
      return localLangauge as ELanguages
    }

    const deviceLang = this.getDeviceLang()

    // If device lang exist
    if (Object.values(Language).includes(deviceLang)) {
      this.setLanguage(deviceLang)
      return deviceLang
    }

    return this.DEFAULT_LANGUAGE
  }

  //Set lang
  static async setLanguage(lang: ELanguages) {
    i18next.changeLanguage(lang)

    return this.storage.setItem(this.KEY, lang)
  }
}
