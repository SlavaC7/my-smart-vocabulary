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
