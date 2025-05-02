import styled from 'styled-components'

import { Styled } from '@/shared'

export const Container = styled(Styled.Touchable)`
  padding: 12px;
  width: 100%;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  border-radius: 12px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const TypeContainer = styled(Styled.FlexWrapper)`
  width: auto;
  background-color: ${({ theme: { COLORS } }) => COLORS.black};
  border-radius: 20px;
  padding: 5px 7px;
`
