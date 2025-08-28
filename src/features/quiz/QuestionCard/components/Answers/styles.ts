import styled from 'styled-components'

import { Styled } from '@/shared'

export const ItemContainer = styled(Styled.Touchable).attrs({
  width: 'auto',
  mBottom: '10px',
  mLeft: '5px',
})<{ isCorrect: boolean; isActive: boolean; thisAnswer: boolean }>`
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme: { COLORS } }) => COLORS.black};
  background-color: ${({
    thisAnswer,
    disabled,
    isCorrect,
    isActive,
    theme: { COLORS },
  }) => {
    if (isActive && !thisAnswer) {
      return COLORS.neutral_400
    }

    if (thisAnswer) {
      if (isCorrect) {
        return COLORS.green_200
      }

      return COLORS.red_300
    } else if (disabled && isCorrect) {
      return COLORS.green_200
    }

    return COLORS.transparent
  }};
`
