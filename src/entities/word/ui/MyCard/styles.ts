import styled from 'styled-components'

import { Styled } from '@/shared'

export const Container = styled(Styled.Touchable)`
  padding: 12px;
  width: 100%;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  border-radius: 12px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const DuplicateContainer = styled(Styled.FlexWrapper).attrs({
  mRight: '10px',
  width: 'auto',
})`
  background-color: ${({ theme: { COLORS } }) => COLORS.red_300};
  border-radius: 20px;
  padding: 5px 7px;
`
