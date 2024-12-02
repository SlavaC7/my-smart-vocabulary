import React, { FC } from 'react'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from 'styled-components'

import { ContentContainer } from './styled'
import { TCustomBottomBar } from './types'

export const Standard: FC<TCustomBottomBar> = ({
  children,
  containerStyle = {},
  bottomInset = false,
  withShadow = false,
}) => {
  const { SHADOWS } = useTheme()
  const { bottom } = useSafeAreaInsets()

  return (
    <ContentContainer
      bottomInst={bottomInset ? bottom : 0}
      style={[containerStyle, withShadow ? SHADOWS.footer : {}]}>
      {children}
    </ContentContainer>
  )
}
