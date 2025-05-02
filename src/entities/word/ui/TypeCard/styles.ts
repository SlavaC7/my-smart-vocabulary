import styled, { css } from 'styled-components'

import { Styled } from '@/shared'

export const ItemContainer = styled(Styled.Touchable).attrs({
  width: 'auto',
})<{ active: boolean; size: 'small' | 'standard' }>`
  background-color: ${({ theme: { COLORS }, active }) =>
    active ? COLORS.black : COLORS.transparent};
  border: 1px solid ${({ theme: { COLORS } }) => COLORS.black};

  ${({ size }) =>
    size === 'small' &&
    css`
      border-radius: 40px;
      padding: 5px 7px;
    `}

  ${({ size }) =>
    size === 'standard' &&
    css`
      border-radius: 40px;
      padding: 8px 12px;
    `}
`
