import styled from 'styled-components'

import { Styled } from '@/shared'

export const AddCount = styled(Styled.Touchable).attrs({
  width: 'auto',
})`
  flex: 1;
  padding: 5px 10px;

  background-color: ${({ theme: { COLORS } }) => COLORS.neutral_200};

  border-radius: 8px;
`
