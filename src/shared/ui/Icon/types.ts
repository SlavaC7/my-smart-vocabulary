import { StyleProp, ViewStyle } from 'react-native'

import { SvgProps } from 'react-native-svg'

import { TIconsKeys } from '@assets/svg'

export type TIconProps = {
  style?: StyleProp<ViewStyle>
  name: TIconsKeys
  fill?: string
  size?: number
} & SvgProps
