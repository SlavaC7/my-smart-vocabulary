import React, { useMemo } from 'react'

import { ActivityIndicator } from 'react-native'

import { useTheme } from 'styled-components'

import { Icon } from '../../Icon'
import { TIconProps } from '../../Icon/types'
import { EColors, Typography } from '../../styled'

import { StyledButton } from './styles'
import { TStandard } from './types'

export const Standard = ({
  children,
  width = '100%',
  color = 'black',
  text,
  textColor = 'font_dark_blue',
  disabled = false,
  radius = 70,
  icon,
  iconProps = {},
  type = 'primary',
  borderColor,
  borderWidth,
  iconPosition = 'left',
  size = 'M',
  loading,
  ...props
}: TStandard) => {
  const { COLORS } = useTheme()

  const styledType: {
    color?: keyof typeof EColors
    iconProps?: Omit<TIconProps, 'name'>
    textColor?: keyof typeof EColors
    borderColor?: keyof typeof EColors
    borderWidth?: number
  } = useMemo(() => {
    if (type === 'primary') {
      if (disabled) {
        return {
          color: 'neutral_400',
          iconProps: {
            fill: COLORS.font_dark_blue,
            ...iconProps,
          },
          textColor: 'white',
        }
      }

      return {
        color: 'black',
        iconProps: {
          fill: COLORS.font_dark_blue,
          ...iconProps,
        },
        textColor: 'white',
      }
    }

    if (type === 'secondary') {
      if (disabled) {
        return {
          color: 'transparent',
          iconProps: {
            fill: COLORS.neutral_500,
            ...iconProps,
          },
          textColor: 'white',
          borderColor: 'neutral_500',
          borderWidth: 1,
        }
      }

      return {
        color: 'transparent',
        iconProps: {
          fill: COLORS.neutral_700,
          ...iconProps,
        },
        textColor: 'white',
        borderColor: 'primary_500',
        borderWidth: 1,
      }
    }

    if (type === 'tertiary') {
      if (disabled) {
        return {
          color: 'transparent',
          iconProps: {
            fill: COLORS.transparent,
            ...iconProps,
          },
          textColor: 'primary_500',
        }
      }

      return {
        color: 'transparent',
        iconProps: {
          fill: COLORS.transparent,
          ...iconProps,
        },
        textColor: 'primary_500',
        borderWidth: 0,
      }
    }

    return {
      color,
      iconProps,
      textColor,
      borderColor,
      borderWidth,
    }
  }, [type, disabled, borderWidth, borderColor, color, iconProps, textColor])

  const { TextComponent, ...styledSize } = useMemo(() => {
    if (size === 'M') {
      return {
        height: '52px',
        TextComponent: Typography.Body1R,
        iconSize: 24,
        pHorizontal: 32,
      }
    }

    if (size === 'S') {
      return {
        height: '42px',
        TextComponent: Typography.Body2R,
        iconSize: 24,
        pHorizontal: 28,
      }
    }

    return {
      height: '28px',
      TextComponent: Typography.Caption1R,
      iconSize: 14,
      pHorizontal: 24,
    }
  }, [size])

  return (
    <StyledButton
      width={width}
      radius={radius}
      disabled={!!disabled}
      {...styledSize}
      {...styledType}
      {...props}>
      {!!loading && (
        <ActivityIndicator
          color={COLORS[styledType?.textColor || 'primary_500']}
        />
      )}

      {!loading && (
        <React.Fragment>
          {!!icon && iconPosition === 'left' && (
            <Icon
              name={icon}
              size={styledSize.iconSize}
              {...styledType.iconProps}
            />
          )}

          {!!text && (
            <TextComponent
              mLeft={icon && iconPosition === 'left' ? '4px' : '0px'}
              mRight={icon && iconPosition === 'right' ? '4px' : '0px'}
              color={styledType.textColor}
              disabled={!!disabled}>
              {text}
            </TextComponent>
          )}

          {!!icon && iconPosition === 'right' && (
            <Icon
              name={icon}
              size={styledSize.iconSize}
              {...styledType.iconProps}
            />
          )}
          {children}
        </React.Fragment>
      )}
    </StyledButton>
  )
}
