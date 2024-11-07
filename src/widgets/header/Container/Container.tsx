import React, { ReactElement, ReactNode } from 'react'
import { StatusBar, StyleProp, StyleSheet, ViewStyle } from 'react-native'

import { getDefaultHeaderHeight } from '@react-navigation/elements'
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import { EColors } from '@/shared/ui/styled'

import { BarHeight, HeaderContainer } from './styled'

export type TWrapper = {
  isTransparent?: boolean
  children: ReactNode
}

export const Container = ({
  isTransparent = false,
  children,
}: TWrapper): ReactElement => {
  const insets = useSafeAreaInsets()
  const frame = useSafeAreaFrame()

  const statusBarHeight = insets.top

  const defaultHeight = getDefaultHeaderHeight(frame, false, statusBarHeight)

  const getStyle = (): StyleProp<ViewStyle> => {
    if (isTransparent) {
      return {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 2,
      }
    }

    return {
      backgroundColor: EColors.white,
    }
  }

  return (
    <>
      {!isTransparent && (
        <StatusBar
          barStyle={'dark-content'}
          // barStyle={'light-content'}
          backgroundColor={EColors.translation}
          translucent
        />
      )}

      <HeaderContainer
        height={defaultHeight}
        style={[getStyle(), styles.shadow]}>
        <BarHeight height={statusBarHeight} />
        {children}
      </HeaderContainer>
    </>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
