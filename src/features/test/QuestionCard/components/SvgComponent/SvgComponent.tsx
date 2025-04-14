import React from 'react'

import { View } from 'react-native'

import Svg, { Circle, ClipPath, Defs, Rect } from 'react-native-svg'

import { EColors } from '@/shared'

import * as Sizes from '../../config'

import { TSvgComponentProps } from './types'

export const SvgComponent = ({
  style,
  circle = 0,
  minusWidth = 0,
  color = EColors.primary_300,
}: TSvgComponentProps) => {
  const modificationWidth = Sizes.CARD_WIDTH - minusWidth
  const sameProps = {
    x: '0',
    y: '0',
    rx: `${Sizes.CARD_BORDER_RADIUS}`,
    ry: `${Sizes.CARD_BORDER_RADIUS}`,
    width: `${modificationWidth}`,
    height: `${Sizes.CARD_HEIGHT}`,
  }

  return (
    <View style={style}>
      <Svg width={modificationWidth} height={Sizes.CARD_HEIGHT}>
        <Defs>
          <ClipPath id="clip">
            <Rect {...sameProps} />

            <Circle
              cx={`${modificationWidth / 2}`}
              cy={`${Sizes.CARD_HEIGHT + 10}`}
              r={`${Sizes.CIRCLE_RADIUS - circle}`}
            />
          </ClipPath>
        </Defs>

        <Rect {...sameProps} fill={color} clipPath="url(#clip)" />
      </Svg>
    </View>
  )
}
