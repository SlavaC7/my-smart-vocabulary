import { HOST } from '@env'
import axios, { InternalAxiosRequestConfig } from 'axios'
import i18next from 'i18next'

import { ELanguages } from '@/app/i18n'

// if Firebase token
// import auth from '@react-native-firebase/auth'

const privateInstance = axios.create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json',
  },
})

const publicInstance = axios.create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json',
  },
})

const langConfig = (config: InternalAxiosRequestConfig<unknown>) => {
  // Append current lang
  const lang = i18next.language || ELanguages.en

  // If get method
  if (['get'].includes(config.method as string)) {
    config.params = { lang, ...config.params }
    return config
  }

  return config
}

privateInstance.interceptors.request.use(
  async config => {
    // if Firebase token
    // const token = await auth().currentUser?.getIdToken(true)

    const token = ''

    if (token && config.headers) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return langConfig(config)
  },
  error => {
    return Promise.reject(error)
  },
)

publicInstance.interceptors.request.use(
  async config => {
    return langConfig(config)
  },
  error => {
    return Promise.reject(error)
  },
)

export const apiPrivate = privateInstance
export const publicPrivate = publicInstance
