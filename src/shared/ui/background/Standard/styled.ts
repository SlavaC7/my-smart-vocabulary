import { View } from 'react-native'

import styled from 'styled-components'

import { EColors } from '../../styled'

export const Background = styled(View)<{ color: keyof typeof EColors }>`
  background-color: ${({ color, theme: { COLORS } }) =>
    COLORS[color || 'transparent']};
  flex: 1;
`
