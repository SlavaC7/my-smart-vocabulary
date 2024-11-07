import React from 'react'

import { Icon } from '../../Icon'
import { EColors } from '../../styled'

import { StyledButton, StyledText } from './styled'
import { TStandard } from './types'

export const Standard = ({
  children,
  width = '100%',
  height = '52px',
  color = EColors.primary,
  text,
  textColor = EColors.white,
  mTop = '0px',
  mBottom = '0px',
  mLeft = '0px',
  mRight = '0px',
  disabled = false,
  radius = 8,
  icon,
  hideBorder = false,
  iconProps = {},
  ...props
}: TStandard) => {
  return (
    <StyledButton
      color={color}
      width={width}
      height={height}
      mTop={mTop}
      mBottom={mBottom}
      radius={radius}
      mLeft={mLeft}
      mRight={mRight}
      disabled={!!disabled}
      hideBorder={hideBorder}
      {...props}>
      {!!icon && <Icon name={icon} {...iconProps} />}
      {!!text && (
        <StyledText
          mLeft={!!icon ? '8px' : '0px'}
          color={textColor}
          disabled={!!disabled}>
          {text}
        </StyledText>
      )}
      {children}
    </StyledButton>
  )
}
