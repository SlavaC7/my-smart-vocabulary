import styled from 'styled-components'

import { Styled } from '@/shared'

export const Container = styled(Styled.Touchable).attrs({
  width: '50px',
  mLeft: '16px',
  height: '100%',
})`
  border-radius: 12px;

  background-color: ${({ theme: { COLORS } }) => COLORS.red_15};
`
