import { StyleProp, Text, TextStyle } from 'react-native'

import styled, { css } from 'styled-components'

import { MARGIN, FONT } from '../utils'

import { EColors } from './colors'
import { TStyledTextProps } from './types'

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

    color: ${props.color || EColors.black};

    text-align: ${props.align || 'auto'};
  `}
`

export const H1 = styled(StyledText)`
  font-size: 18px;
  font-weight: 700;
`

export const H2 = styled(StyledText)`
  font-size: 16px;
  font-weight: 700;
`

export const Body1R = styled(StyledText)`
  font-size: 16px;
  font-weight: 400;
`

export const Body1SB = styled(StyledText)`
  font-size: 16px;
  font-weight: 500;
`

export const Body2R = styled(StyledText)`
  font-size: 14px;
  font-weight: 400;
`

export const Body2SB = styled(StyledText)`
  font-size: 14px;
  font-weight: 500;
`

export const CaptionSB = styled(StyledText)`
  font-size: 12px;
  font-weight: 500;
`

export const CaptionR = styled(StyledText)`
  font-size: 12px;
`
