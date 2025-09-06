import styled from 'styled-components'

import { Styled } from '@/shared'

export const Container = styled(Styled.FlexWrapper).attrs({
  flexDirection: 'column',
})`
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  border-radius: 8px;
  padding: 10px;
`

export const ButtonSection = styled(Styled.Touchable).attrs({ width: '49%' })`
  padding: 5px 0;
  /* background-color: ${({ theme: { COLORS } }) => COLORS.neutral_100}; */
  border-radius: 8px;
`
