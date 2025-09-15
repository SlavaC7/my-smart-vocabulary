import styled from 'styled-components'

import { Styled, TEColors } from '@/shared'

export const Container = styled(Styled.Touchable).attrs({
  mBottom: '16px',
  align: 'flex-start',
  flexDirection: 'column',
})`
  border-radius: 20px;
  padding: 10px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
`

export const StatsContainer = styled(Styled.FlexWrapper).attrs({
  justify: 'space-between',
  mTop: '10px',
})`
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
`

export const Stat = styled(Styled.FlexWrapper).attrs({
  flexDirection: 'column',
  align: 'center',
})<{ color: TEColors }>`
  width: 50%;
  padding: 10px 0px;
  background-color: ${({ color, theme: { COLORS } }) => COLORS[color] + '60'};
`

export const MoreDetails = styled(Styled.Touchable).attrs({
  width: '100%',
  mTop: '10px',
})`
  padding: 10px 0px;
  background-color: ${({ theme: { COLORS } }) => COLORS.primary_300};
  border-radius: 12px;
`
