import styled from 'styled-components'

import { Styled } from '@/shared'

export const Item = styled(Styled.Touchable).attrs({
  width: 'auth',
})<{ active: boolean }>`
  padding: 5px 10px;

  background-color: ${({ active, theme: { COLORS } }) =>
    active ? COLORS.black : COLORS.transparent};

  border: 1px solid ${({ theme: { COLORS } }) => COLORS.black};
  border-radius: 8px;
`
