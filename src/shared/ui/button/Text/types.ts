import { TIconsKeys } from '@assets/svg'

import { TIconProps } from '../../Icon/types'
import { EColors } from '../../styled'
import { TMargin } from '../../utils'

export type TTextProps = {
  onPress?: () => void
  text?: string
  textColor?: EColors
  rightIcon?: TIconsKeys
  leftIcon?: TIconsKeys
  rightIconProps?: Partial<Omit<TIconProps, 'name'>>
  leftIconProps?: Partial<Omit<TIconProps, 'name'>>
  disabled?: boolean
  testID?: string
  fontSize?: number
} & Partial<TStyledButton>

export type TStyledButton = {
  width: string
} & TMargin

export type TStyledText = {
  color: EColors
  fontSize: number
}
