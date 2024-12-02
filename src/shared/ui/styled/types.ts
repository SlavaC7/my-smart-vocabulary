import { FlexStyle, TextStyle } from 'react-native'

import { TMargin } from '../utils'

import { EColors } from './colors'
export type TStyledTextProps = {
  size?: string
  color?: keyof typeof EColors | string
  align?: TextStyle['textAlign']
  textTransform?: TextStyle['textTransform']
} & TMargin

export type TFlexWrapper = {
  width?: string
  height?: string
  flexDirection?: FlexStyle['flexDirection']
  justify?: FlexStyle['justifyContent']
  align?: FlexStyle['alignItems']
  wrap?: FlexStyle['flexWrap']
  color?: EColors
} & TMargin

export type THr = TMargin & {
  color?: EColors
  vertical?: boolean
}

export type TDivider = {
  width?: number
  height?: number
  background?: string
}

export type TVisibilityContainer = { visible: boolean } & TMargin
