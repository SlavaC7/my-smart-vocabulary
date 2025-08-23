import styled from 'styled-components'

import { Styled, TEColors } from '@/shared'

export const Container = styled(Styled.FlexWrapper).attrs({
  justify: 'space-between',
})`
  border-radius: 12px;
  overflow: hidden;
`

export const TypeContainer = styled(Styled.FlexWrapper).attrs({
  width: '50%',
  flexDirection: 'column',
})<{ color: TEColors }>`
  padding: 10px 0px;
  background-color: ${({ color, theme: { COLORS } }) => COLORS[color] + '60'};
`
