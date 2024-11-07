import { ReactNode } from 'react'

import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'

export type ScrollProps = {
  children?: ReactNode
  pHorizontal?: number
} & KeyboardAwareScrollViewProps
