import { View } from 'react-native'

import styled from 'styled-components'

import { TEColors } from '@/shared'

export const Line = styled(View)<{ width: number; color: TEColors }>`
  width: ${({ width }) => width}px;
  background-color: ${({ color, theme: { COLORS } }) => COLORS[color]};
  height: 15px;
  border-radius: 20px;
`
