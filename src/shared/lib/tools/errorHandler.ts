import axios, { AxiosError } from 'axios'
import Toast from 'react-native-toast-message'

import { Sentry } from '../sentry'

type Props = {
  error: unknown
  withToast?: boolean
  toastText?: string
  withSentry?: boolean
  name?: string
}

export const errorHandler = ({
  error,
  toastText,
  withSentry,
  name,
  withToast = false,
}: Props) => {
  let axiosError: AxiosError | null = null

  if (axios.isAxiosError(error)) {
    axiosError = error
  }

  if (withToast) {
    Toast.show({
      type: 'error',
      text2:
        toastText ||
        (axiosError?.response?.data as { message: string })?.message ||
        '',
    })
  }

  if (withSentry)
    Sentry.captureException(
      `[REQUEST ERROR]: [${name}] => , ${axiosError?.response?.data}`,
    )

  console.log(`[REQUEST ERROR]: [${name}] => `, axiosError?.response?.data)
}
