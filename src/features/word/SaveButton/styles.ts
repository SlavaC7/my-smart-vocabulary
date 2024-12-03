import styled from 'styled-components'

import { Styled } from '@/shared'

export const Container = styled(Styled.Touchable)`
  border-radius: 50px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  height: 40px;
  width: 140px;
  flex-direction: row;
`
