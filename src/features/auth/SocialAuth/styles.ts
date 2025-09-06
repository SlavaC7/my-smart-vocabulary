import { View } from 'react-native'

import styled from 'styled-components'

import { EColors, Styled } from '@/shared'

export const ButtonContainer = styled(Styled.Touchable)`
  border: 1px solid ${EColors.neutral_500};
  border-radius: 20px;
  padding: 16px;
`

export const Line = styled(View)`
  height: 1px;
  flex: 1;
  border: 1px solid ${EColors.placeholder}50;
`
