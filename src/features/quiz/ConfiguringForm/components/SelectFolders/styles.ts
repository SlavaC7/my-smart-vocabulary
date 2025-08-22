import styled from 'styled-components'

import { Styled } from '@/shared'

export const Item = styled(Styled.Touchable).attrs({
  width: 'auto',
})<{ active: boolean }>`
  padding: 5px 10px;

  background-color: ${({ active, theme: { COLORS } }) =>
    active ? COLORS.black : COLORS.transparent};

  border: 1px solid ${({ theme: { COLORS } }) => COLORS.black};
  border-radius: 8px;
`

export const Button = styled(Styled.Touchable).attrs({
  width: 'auto',
})`
  padding: 5px 10px;

  background-color: ${({ theme: { COLORS } }) => COLORS.white};

  border: 1px solid ${({ theme: { COLORS } }) => COLORS.black};
  border-radius: 8px;
`
