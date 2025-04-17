import { ReactNode } from 'react'
import { ScrollViewProps } from 'react-native'

export type ScrollProps = {
  pTop?: number
  children?: ReactNode
  pHorizontal?: number
} & ScrollViewProps
