import styled from 'styled-components'

import { Styled } from '@/shared'

export const ItemContainer = styled(Styled.Touchable).attrs({
  width: 'auto',
  mBottom: '10px',
  mLeft: '5px',
})<{ isCorrect: boolean; thisAnswer: boolean }>`
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme: { COLORS } }) => COLORS.black};
  background-color: ${({
    thisAnswer,
    disabled,
    isCorrect,
    theme: { COLORS },
  }) =>
    thisAnswer
      ? isCorrect
        ? COLORS.green_200
        : COLORS.red_300
      : disabled && isCorrect
      ? COLORS.green_200
      : COLORS.transparent};
`
