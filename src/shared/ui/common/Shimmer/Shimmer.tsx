import React, { FC } from 'react'

import LinearGradient from 'react-native-linear-gradient'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

import { useTheme } from 'styled-components'

import { TShimmerProps } from './types'

const ShimmerComponent: FC<TShimmerProps> = ({
  width = '100%',
  height = 30,
  borderRadius = 10,
}) => {
  const { COLORS } = useTheme()

  return (
    <ShimmerPlaceHolder
      LinearGradient={LinearGradient}
      style={{
        width,
        height,
        borderRadius,
      }}
      shimmerColors={[COLORS.light_opacity, COLORS.neutral_200]}
      location={[0.2, 0.8]}
    />
  )
}

export const Shimmer = React.memo(ShimmerComponent)
