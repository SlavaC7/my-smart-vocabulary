import styled from 'styled-components'

import { Styled } from '@/shared'

export const ItemContainer = styled(Styled.Touchable).attrs({
  width: 'auto',
  mRight: '16px',
})<{ active: boolean }>`
  background-color: ${({ theme: { COLORS }, active }) =>
    active ? COLORS.black : COLORS.transparent};
  border: 1px solid ${({ theme: { COLORS } }) => COLORS.black};
  border-radius: 40px;
  padding: 8px 12px;
`
