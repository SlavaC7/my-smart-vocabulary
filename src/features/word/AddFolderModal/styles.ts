import styled from 'styled-components'

import { Styled } from '@/shared'

export const Conatiner = styled(Styled.Touchable)`
  height: 40px;
  width: 68px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: { COLORS } }) => COLORS.black};
`
