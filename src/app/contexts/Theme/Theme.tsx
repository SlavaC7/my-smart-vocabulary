import React, { createContext } from 'react'

import { StyleSheet } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'

import { EColors } from '@/shared'

import { TThemeContextProps, TThemeProps } from './types'

export const ThemeContext = createContext<TThemeContextProps>({})

export const ThemeWrapper = ({ children }: TThemeProps) => {
  const insets = useSafeAreaInsets()

  const SHADOWS = StyleSheet.create({
    card: {
      backgroundColor: EColors.black,
      shadowColor: EColors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    footer: {
      backgroundColor: EColors.black,
      shadowColor: EColors.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    toast: {
      shadowColor: EColors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.27,
      shadowRadius: 2,

      elevation: 6,
    },
  })

  return (
    <ThemeContext.Provider value={{}}>
      <ThemeProvider theme={{ COLORS: EColors, SHADOWS, insets }}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
