import { TouchableOpacity, View } from 'react-native'

import styled, { css } from 'styled-components'

import { MARGIN } from '../utils'

import { EColors } from './colors'
import { TFlexWrapper, THr } from './types'

export const FlexWrapper = styled(View)<TFlexWrapper>`
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
  background-color: ${EColors.gray_999};

  ${({ vertical }) =>
    vertical &&
    css`
      width: 1px;
      height: 100%;
    `}

  ${props => MARGIN(props)}
`
