import React from 'react'

import { Icon } from '../../Icon'
import { EColors } from '../../styled'

import * as S from './styles'
import { TTextProps } from './types'

export const Text = ({
  width = 'auto',
  text,
  textColor = EColors.primary_500,
  leftIcon,
  leftIconProps,
  rightIcon,
  rightIconProps,
  disabled,
  fontSize = 16,
  ...props
}: TTextProps) => {
  const color = disabled ? EColors.primary_500 : textColor

  return (
    <S.StyledButton
      activeOpacity={0.8}
      width={width}
      disabled={disabled}
      {...props}>
      {!!leftIcon && <Icon name={leftIcon} fill={color} {...leftIconProps} />}

      {!!text && (
        <S.StyledText
          color={color}
          fontSize={fontSize}
          mLeft={leftIcon ? '4px' : '0px'}
          mRight={rightIcon ? '8px' : '0px'}>
          {text}
        </S.StyledText>
      )}

      {!!rightIcon && (
        <Icon name={rightIcon} fill={color} {...rightIconProps} />
      )}
    </S.StyledButton>
  )
}
