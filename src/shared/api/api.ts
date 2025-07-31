import { HOST } from '@env'
import auth from '@react-native-firebase/auth'
import axios from 'axios'

console.log('HOST: ', HOST)
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

privateInstance.interceptors.request.use(
  async config => {
    const token = await auth().currentUser?.getIdToken(true)

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
