import styled from 'styled-components'

import { Styled } from '@/shared'

export const Container = styled(Styled.Touchable).attrs({
  justify: 'space-between',
})<{ isLast: boolean }>`
  padding: 10px 0px;
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
  border-bottom-color: ${({ theme: { COLORS } }) => COLORS.neutral_300};
`
