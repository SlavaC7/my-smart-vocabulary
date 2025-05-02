import { View } from 'react-native'

import styled from 'styled-components'

import { appPadding, Styled } from '@/shared'

export const Header = styled(View)`
  padding: 0px ${appPadding}px;
  padding-top: ${({ theme: { insets } }) => insets.top + 16}px;
  width: 100%;
  padding-bottom: 50px;
  background-color: ${({ theme: { COLORS } }) => COLORS.black};
  z-index: 10;
  margin-bottom: 20px;
`

export const SearchContainer = styled(View)`
  width: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
  align-self: center;
  bottom: -18px;
  z-index: 10;
`

export const PlusContainer = styled(Styled.Touchable).attrs({
  width: '35px',
  height: '35px',
})`
  border-radius: 100px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
`
