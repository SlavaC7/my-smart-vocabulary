import {
  KeyboardTypeOptions,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'

import { TIconsKeys } from '@assets/svg'

import { TIconProps } from '../../Icon/types'
import { TMargin } from '../../utils'

export type TStandardInputProps = {
  style?: StyleProp<ViewStyle>
  inputContainerStyle?: StyleProp<ViewStyle>
  placeholder?: string
  error?: string
  isError?: boolean
  value?: string
  rightIcon?: TIconsKeys
  leftIcon?: TIconsKeys
  rightIconProps?: Partial<Omit<TIconProps, 'name'>>
  leftIconProps?: Partial<Omit<TIconProps, 'name'>>
  rightAction?: React.ReactElement
  topLabelAction?: React.ReactElement
  leftAction?: React.ReactElement
  onChange?: TextInputProps['onChangeText']
  onPress?: () => void
  onPressRightIcon?: () => void
  withSwitch?: boolean
  disabled?: boolean
  multiline?: boolean
  autoFocus?: boolean
  onSubmitEditing?: () => void
  withoutDisabledStyles?: boolean
  mask?: Array<string | RegExp>
  editable?: boolean
  testID?: string
  maxSigns?: number
  maxLength?: number
  label?: string
  hideBorder?: boolean
  inputProps?: TextInputProps
  inputStyle?: StyleProp<TextStyle>
  keyboardType?: KeyboardTypeOptions
  isBottomSheet?: boolean
  withClear?: boolean
  onBlur?: () => void
  onFocus?: () => void
} & Partial<TContainer> &
  Pick<Partial<TStyledInputContainer>, 'height'>

export type TContainer = {
  width: string
  disabled: boolean
} & TMargin

export type TStyledInputContainer = {
  height: string
  hasError: boolean
  disabled: boolean
  multiline: boolean
}

export type TStyledInput = {
  hasLeftIcon: boolean
  hasRightIcon: boolean
}
