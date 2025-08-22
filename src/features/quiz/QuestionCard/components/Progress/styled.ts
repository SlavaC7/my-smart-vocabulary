import { View } from 'react-native'

import styled from 'styled-components'

import { PROGRESS_HEIGHT } from './config'
import { TStyledIndicator } from './types'

export const Container = styled(View)`
  position: absolute;
  right: 12px;
  top: 12px;
`

export const ProgressContainer = styled(View)`
  height: ${PROGRESS_HEIGHT}px;
  width: 6px;
  background-color: ${({ theme: { COLORS } }) => COLORS.primary_EDE0FF};
  border-radius: 100px;
`

export const Indicator = styled(View)<TStyledIndicator>`
  width: 6px;
  border-radius: 100px;
  height: ${({ count, page }) => (PROGRESS_HEIGHT / count) * page}px;
  background-color: ${({ theme: { COLORS } }) => COLORS.primary_400};
`
