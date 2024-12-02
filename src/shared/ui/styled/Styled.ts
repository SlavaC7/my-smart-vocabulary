import { TouchableOpacity, View } from 'react-native'

import styled, { css } from 'styled-components'

import { appPadding } from '@/shared/lib/config/app'

import { MARGIN, TMargin } from '../utils'

import { EColors } from './colors'
import { TDivider, TFlexWrapper, THr } from './types'

export const FlexWrapper = styled(View)<TFlexWrapper>`
  display: flex;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  max-width: 100%;
  background-color: ${({ color }) => color || 'transparent'};

  ${props => MARGIN(props)}
`

export const Flex1 = styled(View)<TMargin>`
  flex: 1;
  align-self: center;
  ${props => MARGIN(props)}
`

export const Touchable = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TFlexWrapper>`
  display: flex;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  max-width: 100%;

  ${props => MARGIN(props)}
`

export const Hr = styled(View)<THr>`
  width: 100%;
  height: 1px;
  background-color: ${EColors.neutral_300};

  ${({ vertical }) =>
    vertical &&
    css`
      width: 1px;
      height: 100%;
    `}

  ${props => MARGIN(props)}
`

export const Divider = styled(View)<TDivider>(
  ({ width, height, background }) => `
  width: ${width || 0}px;
  height: ${height || 0}px;
  background-color: ${background || 'transparent'};
`,
)

export const Padding = styled(View)<{ padding?: string } & TFlexWrapper>`
  padding: 0px ${({ padding }) => padding || `${appPadding}px`};
  ${props => MARGIN(props)}
`

export const MView = styled(View)<TMargin>`
  ${props => MARGIN(props)}
`
