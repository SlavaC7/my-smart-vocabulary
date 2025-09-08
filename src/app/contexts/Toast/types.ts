import { ReactNode } from 'react'

export type TToastContext = {
  actions: TToastContextActions
}

export type TToastContextProps = {
  children: ReactNode
}

export type TToastContextActions = {
  onHello: () => void
}

export enum EToastType {
  error = 'error',
  info = 'info',
  success = 'success',
}
