import styled from 'styled-components'

import { Styled } from '@/shared'

export const Container = styled(Styled.Touchable).attrs({
  justify: 'flex-start',
  mBottom: '16px',
})`
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  border-radius: 8px;
  padding: 10px;
`
