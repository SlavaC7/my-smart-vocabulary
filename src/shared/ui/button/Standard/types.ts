import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { TIconsKeys } from '@assets/svg'

import { TIconProps } from '../../Icon/types'
import { EColors } from '../../styled'
import { TMargin } from '../../utils'

export type TStandard = {
  onPress?: () => void
  children?: ReactNode
  text?: string
  textColor?: EColors
  style?: StyleProp<ViewStyle>
  icon?: TIconsKeys
  iconProps?: Omit<TIconProps, 'name'>
} & Partial<TStyledButton>

export type TStyledButton = {
  width: string
  height: string
  color: EColors
  disabled: boolean
  hideBorder: boolean
  radius: number
} & TMargin

export type TStyledText = {
  disabled: boolean
  color: EColors
}
