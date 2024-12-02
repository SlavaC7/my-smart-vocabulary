import { ReactNode } from 'react'

import { ViewStyle, StyleProp } from 'react-native'

export type TCustomBottomBar = {
  containerStyle?: StyleProp<ViewStyle>
  children?: ReactNode
  bottomInset?: boolean
  withShadow?: boolean
}
