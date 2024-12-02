import { StyleProp, Text, TextStyle } from 'react-native'

import styled, { css } from 'styled-components'

import { isIos } from '@/shared/lib'

import { FONT, MARGIN } from '../utils'

import { EColors } from './colors'
import { TStyledTextProps } from './types'

const boldFontWeight = isIos ? 600 : 700
const mediumWeight = 500
const regularFontWeight = 400

export const StyledText = styled(Text).attrs<{ style?: StyleProp<TextStyle> }>(
  props => ({
    style: [
      ...(Array.isArray(props.style) ? props.style : [props.style]),
      {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    ],
    allowFontScaling: false,
  }),
)<TStyledTextProps>`
  ${FONT({})}
  ${props => css`
    ${MARGIN(props)}

    ${props.size &&
    css`
      font-size: ${props.size};
    `}

    color: ${({ theme: { COLORS } }) =>
      Object.keys(COLORS).includes(props?.color as EColors)
        ? COLORS[(props?.color || 'black') as keyof typeof COLORS]
        : props.color};

    text-align: ${props.align || 'auto'};
    text-transform: ${props.textTransform || 'none'};
  `}
`

export const H1 = styled(StyledText)`
  font-size: ${props => props?.size || '24px'};
  font-weight: ${boldFontWeight};
`
export const H1R = styled(StyledText)`
  font-size: ${props => props?.size || '22px'};
  font-weight: ${regularFontWeight};
`

export const H2 = styled(StyledText)`
  font-size: ${props => props?.size || '20px'};
  font-weight: ${boldFontWeight};
`

export const H3Bold = styled(StyledText)`
  font-size: ${props => props?.size || '18px'};
  font-weight: ${boldFontWeight};
`

export const H3R = styled(StyledText)`
  font-size: ${props => props?.size || '18px'};
  font-weight: ${regularFontWeight};
`

export const H3 = styled(StyledText)`
  font-size: ${props => props?.size || '16px'};
  font-weight: ${boldFontWeight};
`

export const H4 = styled(StyledText)`
  font-size: ${props => props?.size || '14px'};
  font-weight: ${mediumWeight};
`

export const H5 = styled(StyledText)`
  font-size: ${props => props?.size || '12px'};
  font-weight: ${mediumWeight};
`

export const Body1R = styled(StyledText)`
  font-size: ${props => props?.size || '16px'};
  font-weight: ${regularFontWeight};
`

export const Body2R = styled(StyledText)`
  font-size: ${props => props?.size || '14px'};
  font-weight: ${regularFontWeight};
`

export const Caption1R = styled(StyledText)`
  font-size: ${props => props?.size || '12px'};
  font-weight: ${regularFontWeight};
`
