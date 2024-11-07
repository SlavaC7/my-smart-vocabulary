import { FlexStyle, TextStyle } from 'react-native'

import { TMargin } from '../utils'

import { EColors } from './colors'

export type TStyledTextProps = {
  size?: string
  color?: EColors
  align?: TextStyle['textAlign']
} & TMargin

export type TFlexWrapper = {
  width?: string
  height?: string
  flexDirection?: FlexStyle['flexDirection']
  justify?: FlexStyle['justifyContent']
  align?: FlexStyle['alignItems']
  wrap?: FlexStyle['flexWrap']
} & TMargin

export type THr = TMargin & {
  color?: EColors
  vertical?: boolean
}
