import styled from 'styled-components'

import { Styled } from '@/shared'

export const Container = styled(Styled.Touchable).attrs({
  height: '36px',
  justify: 'flex-start',
})`
  padding-left: 10px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  border-radius: 10px;
`
