import { Platform } from 'react-native'

import { HOST } from '@env'
import axios from 'axios'
import DeviceInfo from 'react-native-device-info'

const timeout = 1000 * 60

const version = `${DeviceInfo.getVersion()}${
  Platform.OS === 'ios'
    ? ` (${DeviceInfo.getBuildNumber()})`
    : `.${DeviceInfo.getBuildNumber()}`
}`

const headerDeviceData = {
  'App-Version': version,
  'System-Version': `${Platform.OS} ${DeviceInfo.getSystemVersion()}`,
  Device: `${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`,
}

const privateInstance = axios.create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json',
    ...headerDeviceData,
  },
  timeout,
})

const publicInstance = axios.create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json',
    ...headerDeviceData,
  },
  timeout,
})

privateInstance.interceptors.request.use(
  async config => {
    const token = null

    if (token && config.headers) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

privateInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (error?.response?.status === 401) {
      // Logout
    }

    return Promise.reject(error)
  },
)

publicInstance.interceptors.request.use(
  async config => {
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export const apiPrivate = privateInstance
export const apiPublic = publicInstance
