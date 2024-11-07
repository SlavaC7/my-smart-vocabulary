import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { EColors } from '../../styled'

import { Background } from './styled'

type TStandard = {
  color?: EColors
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  pHorizontal?: number
}

export const Standard = ({
  children,
  color = EColors.white,
  pHorizontal = 0,
  ...props
}: TStandard) => {
  return (
    <Background
      style={{ paddingHorizontal: pHorizontal }}
      color={color}
      {...props}>
      {children}
    </Background>
  )
}
