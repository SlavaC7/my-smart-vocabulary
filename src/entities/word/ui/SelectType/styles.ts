import styled from 'styled-components'

import { Styled } from '@/shared'

export const SelectItem = styled(Styled.Touchable)<{ active: boolean }>`
  width: auto;
  flex: 1;
  border-radius: 8px;
  padding: 10px 10px;
  border: 1px solid ${({ theme: { COLORS } }) => COLORS.neutral_300};
  background-color: ${({ theme: { COLORS }, active }) =>
    active ? COLORS.primary_400 : COLORS.white};
`
