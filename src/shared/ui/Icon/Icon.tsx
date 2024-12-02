import React from 'react'

import { Svg } from '@assets/svg'

import { EColors } from '../styled'

import { TIconProps } from './types'

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
