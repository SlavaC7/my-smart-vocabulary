import React, { ReactElement } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { EColors } from '@/shared'
import { isAndroid } from '@/shared/lib'

import * as S from './styles'
import { TContainerProps } from './types'

export const Wrapper = ({
  children,
  color,
  topInset = false,
  transparent = true,
  hasShadow,
  ...props
}: TContainerProps): ReactElement => {
  const { top } = useSafeAreaInsets()

  const bg =
    color ||
    (transparent
      ? EColors.background || EColors.background
      : EColors.background)

  const getStyle = (): StyleProp<ViewStyle> => {
    return {
      paddingBottom: 12,
      backgroundColor: bg,
    }
  }

  return (
    <>
      <S.Header
        style={[getStyle(), hasShadow ? S.styles.shadow : {}]}
        {...props}>
        {!!topInset && <S.BarHeight height={top} />}
        {isAndroid && !topInset && <S.BarHeight height={12} />}
        {children}
      </S.Header>
    </>
  )
}
