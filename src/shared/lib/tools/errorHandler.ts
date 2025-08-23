import axios, { AxiosError } from 'axios'
import Toast from 'react-native-toast-message'

import { Sentry } from '../sentry'

type Props = {
  error: unknown
  withToast?: boolean
  withSentry?: boolean
  name?: string
}

export const errorHandler = ({
  error,
  name,
  withSentry = true,
  withToast = true,
}: Props) => {
  const isAxios = axios.isAxiosError(error)
  let axiosError: AxiosError | null = null

  if (isAxios) {
    axiosError = error
  }

  if (withToast) {
    Toast.show({
      type: 'error',
      text2: isAxios
        ? (axiosError?.response?.data as { message: string })?.message || ''
        : error + '' || '',
    })
  }

  if (withSentry)
    Sentry.withScope(scope => {
      scope.setTag('ERROR:', JSON.stringify(error))

      Sentry.captureException(
        `[REQUEST ERROR]: [${name}] => , ${axiosError?.response?.data}`,
      )
    })

  console.log(
    `[REQUEST ERROR]: [${name}] => `,
    { ...(error as {}) },
    axiosError?.response?.data,
  )
}
