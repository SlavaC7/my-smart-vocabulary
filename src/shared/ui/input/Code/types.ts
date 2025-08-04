import { StyleProp, ViewStyle } from 'react-native'

import { CodeFieldProps } from 'react-native-confirmation-code-field'

import { TMargin } from '../../utils'

export type TPhone = {
  style?: StyleProp<ViewStyle>
  error?: string
  value: string
  onChange: (text: string) => void
  topComponent?: React.ReactElement | null
  inputMode?: CodeFieldProps['inputMode']
} & Partial<TContainer>

export type TContainer = {
  width: string
} & TMargin

export type TStyledInputContainer = {
  hasError: boolean
}

export type TStyledInput = {
  hasLeftIcon: boolean
  hasRightIcon: boolean
}
