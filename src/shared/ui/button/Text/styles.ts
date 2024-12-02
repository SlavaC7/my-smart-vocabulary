import { TouchableOpacity } from 'react-native'

import styled from 'styled-components'

import { Typography } from '../../styled'
import { MARGIN } from '../../utils'

import { TStyledButton, TStyledText } from './types'

export const StyledButton = styled(TouchableOpacity)<TStyledButton>`
  width: ${({ width }) => width};
  display: flex;
  align-items: center;
  flex-direction: row;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  ${props => MARGIN(props)}
`

export const StyledText = styled(Typography.Body2R)<TStyledText>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}px;
`
