import { ReactNode } from 'react'

import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'

import { TEColors } from '../../styled'

export type ScrollProps = {
  children?: ReactNode
  pHorizontal?: number
  color: TEColors
} & KeyboardAwareScrollViewProps
