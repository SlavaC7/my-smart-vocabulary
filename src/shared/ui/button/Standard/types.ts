import { ReactNode } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

import { TIconsKeys } from '@assets/svg'

import { TIconProps } from '../../Icon/types'
import { EColors } from '../../styled'
import { TFlex, TMargin } from '../../utils'

export type TStandard = {
  onPress?: () => void
  children?: ReactNode
  text?: string
  textColor?: keyof typeof EColors
  style?: StyleProp<ViewStyle>
  icon?: TIconsKeys
  iconProps?: Omit<TIconProps, 'name'>
  iconPosition?: 'left' | 'right'
  type?: 'primary' | 'secondary' | 'tertiary' | 'custom'
  size?: 'M' | 'S' | 'XS'
  testID?: string
  loading?: boolean
} & Partial<TStyledButton>

export type TStyledButton = {
  width: string
  height: string
  color: keyof typeof EColors
  disabled: boolean
  radius: number
  borderWidth: number
  borderColor: keyof typeof EColors
  pHorizontal?: number
} & TMargin &
  TFlex

export type TStyledText = {
  disabled: boolean
  color: keyof typeof EColors
}
