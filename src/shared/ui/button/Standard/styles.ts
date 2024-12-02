import { TouchableOpacity } from 'react-native'

import styled from 'styled-components'

import { FLEX, MARGIN } from '../../utils'

import { TStyledButton } from './types'

export const StyledButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<Partial<TStyledButton>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius}px;
  background-color: ${({ color, theme: { COLORS } }) =>
    COLORS[color || 'primary_500']};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-width: ${({ borderWidth = 0 }) => borderWidth}px;
  border-color: ${({ borderColor, theme: { COLORS } }) =>
    COLORS[borderColor || 'neutral_500']};
  padding: ${({ pHorizontal = 0 }) => `0px ${pHorizontal}px`};

  ${props => FLEX(props)};

  ${props => MARGIN(props)};
`
