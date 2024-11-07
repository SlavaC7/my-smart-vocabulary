import React from 'react'

import { Svg } from '@assets/svg'

import { TIconProps } from './types'
import { EColors } from '../styled'

export const Icon = ({
  name,
  fill,
  size = 24,
  height,
  width,
  style,
  ...props
}: TIconProps) => {
  const currentFill = fill || EColors.black
  const IconSvg = Svg[name]

  return (
    <IconSvg
      style={style}
      width={size ?? width}
      height={size ?? height}
      fill={currentFill}
      {...{ props }}
    />
  )
}
