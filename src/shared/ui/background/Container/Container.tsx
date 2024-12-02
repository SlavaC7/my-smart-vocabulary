import React, { ReactNode } from 'react'

import { StatusBar, StyleProp, ViewStyle } from 'react-native'

import _ from 'lodash'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { EColors } from '../../styled'

import * as S from './styled'

type TContainerProps = {
  color?: EColors
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  pHorizontal?: number
  top?: number
  bottom?: number
  left?: number
  right?: number
  testID?: string
}

export const Container = ({
  children,
  color = EColors.white,
  pHorizontal = 0,
  ...props
}: TContainerProps) => {
  const { top, bottom, left, right } = useSafeAreaInsets()

  return (
    <S.Background
      style={{
        paddingHorizontal: pHorizontal,
        paddingTop: _.isNumber(props?.top) ? props.top : top,
        paddingBottom: _.isNumber(props?.bottom) ? props.bottom : bottom,
        paddingLeft: _.isNumber(props?.left) ? props.left : left,
        paddingRight: _.isNumber(props?.right) ? props.right : right,
      }}
      color={color}
      {...props}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={color}
      />
      {children}
    </S.Background>
  )
}
