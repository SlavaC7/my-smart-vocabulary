import { StyleProp, ViewStyle } from 'react-native'

import { EColors } from '@/shared'

export type TSvgComponentProps = {
  style?: StyleProp<ViewStyle>
  circle?: number
  minusWidth?: number
  color?: EColors
}
