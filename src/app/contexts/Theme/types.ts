import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type TThemeProps = {
  children: ReactNode
}

export type TThemeContextProps = {}

export type TShadows = Record<'card' | 'footer' | 'toast', StyleProp<ViewStyle>>
