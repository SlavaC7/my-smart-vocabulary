import axios from 'axios'
import Toast from 'react-native-toast-message'

import { Sentry } from '../sentry'

type ErrorHandlerProps = {
  error: unknown
  withToast?: boolean
  withSentry?: boolean
  name?: string
}

type ErrorInfo = {
  message: string
  code?: string | number
  status?: number
  data?: unknown
  stack?: string
  isAxiosError: boolean
}

export const errorHandler = ({
  error,
  name = 'unknown',
  withToast = true,
  withSentry = true,
}: ErrorHandlerProps) => {
  // Нормализация ошибки
  const errorInfo = normalizeError(error)

  if (withToast) {
    showToast(errorInfo)
  }

  if (withSentry) {
    sendToSentry(errorInfo, name, error)
  }

  logError(errorInfo, name, error)

  return errorInfo
}

// Нормализация различных типов ошибок
const normalizeError = (error: unknown): ErrorInfo => {
  // Axios ошибка
  if (axios.isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message || error.message || 'Unknown Axios error',
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack,
      isAxiosError: true,
    }
  }

  // Нативная Error
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
      isAxiosError: false,
    }
  }

  // Строка
  if (typeof error === 'string') {
    return {
      message: error,
      isAxiosError: false,
    }
  }

  // Объект с сообщением
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return {
      message: String((error as any).message),
      isAxiosError: false,
    }
  }

  // Неизвестный тип ошибки
  return {
    message: 'Unknown error occurred',
    isAxiosError: false,
  }
}

// Показ Toast уведомления
const showToast = (errorInfo: ErrorInfo) => {
  console.log('TOAST ERROR:', errorInfo)
  const message = errorInfo.message || 'An error occurred'

  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
  })
}

// Отправка ошибки в Sentry
const sendToSentry = (
  errorInfo: ErrorInfo,
  name: string,
  originalError: unknown,
) => {
  Sentry.withScope(scope => {
    // Добавляем контекст
    scope.setTag('context', name)

    // Добавляем дополнительную информацию
    scope.setExtra('isAxiosError', errorInfo.isAxiosError)

    if (errorInfo.code) {
      scope.setExtra('errorCode', errorInfo.code)
    }

    if (errorInfo.status) {
      scope.setExtra('statusCode', errorInfo.status)
    }

    if (errorInfo.data) {
      scope.setExtra('responseData', JSON.stringify(errorInfo.data))
    }

    // Отправляем оригинальную ошибку, если это Error, или создаем новую
    if (originalError instanceof Error) {
      scope.setExtra('normalizedMessage', errorInfo.message)
      Sentry.captureException(originalError)
    } else {
      // Для не-Error объектов создаем исключение с нормализованной информацией
      const exception = new Error(errorInfo.message)
      Sentry.captureException(exception)
    }
  })
}

// Логирование ошибки
const logError = (
  errorInfo: ErrorInfo,
  context: string,
  originalError: unknown,
) => {
  console.group(`[ERROR] ${context}`)
  console.log('Message:', errorInfo.message)
  console.log('Context:', context)
  console.log('Is Axios Error:', errorInfo.isAxiosError)

  if (errorInfo.code) {
    console.log('Error Code:', errorInfo.code)
  }

  if (errorInfo.status) {
    console.log('Status Code:', errorInfo.status)
  }

  if (errorInfo.data) {
    console.log('Response Data:', errorInfo.data)
  }

  console.log('Original Error:', { ...originalError })
  console.groupEnd()
}

// // Вспомогательные функции для частых случаев
// export const axiosErrorHandler = (error: unknown, context?: string) => {
//   // return errorHandler({
//   //   error,
//   //   context: context || 'Axios Request',
//   //   withToast: true,
//   //   withSentry: true,
//   // })
// }

// export const asyncErrorHandler = async <T>(
//   promise: Promise<T>,
//   context?: string,
// ): Promise<[T | null, ErrorInfo | null]> => {
//   try {
//     const result = await promise
//     return [result, null]
//   } catch (error) {
//     // const errorInfo = errorHandler({
//     //   error,
//     //   context: context || 'Async Operation',
//     // })
//     return [null, errorInfo]
//   }
// }
