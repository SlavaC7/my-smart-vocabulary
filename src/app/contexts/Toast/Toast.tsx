import React from 'react'
import { createContext } from 'react'

import { useTranslation } from 'react-i18next'
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  ToastConfig,
} from 'react-native-toast-message'

import { styles } from './styles'
import {
  EToastType,
  TToastContext,
  TToastContextActions,
  TToastContextProps,
} from './types'

const toastConfigProps = {
  contentContainerStyle: styles.toastContainer,
  text1Style: styles.text1,
  text2Style: styles.text2,
  text1NumberOfLines: 2,
  text2NumberOfLines: 3,
}

export const ToastContext = createContext<TToastContext>({
  actions: {
    onHello: () => {},
  },
})

export const ToastWrapper = ({ children }: TToastContextProps) => {
  const { t, keys } = useTranslation()

  const toastConfig: ToastConfig = {
    [EToastType.success]: props => (
      <BaseToast
        {...props}
        text1={
          props?.text1
            ? t(props?.text1 as keyof typeof keys)
            : t('toasts.success')
        }
        text2={props?.text2 ? t(props?.text2 as keyof typeof keys) : ''}
        style={styles.successToast}
        {...toastConfigProps}
      />
    ),
    [EToastType.error]: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        text1={
          props?.text1
            ? t(props?.text1 as keyof typeof keys)
            : t('toasts.error')
        }
        text2={props?.text2 ? t(props?.text2 as keyof typeof keys) : ''}
        style={styles.errorToast}
        {...toastConfigProps}
      />
    ),
  }

  const actions: TToastContextActions = {
    onHello: () => {
      Toast.show({
        type: EToastType.success,
        text1: 'Hello',
      })
    },
  }
  return (
    <ToastContext.Provider value={{ actions }}>
      {children}
      <Toast config={toastConfig} />
    </ToastContext.Provider>
  )
}
