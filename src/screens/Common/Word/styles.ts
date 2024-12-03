import { View } from 'react-native'

import styled from 'styled-components'

import { MARGIN, TMargin } from '@/shared'

export const WordContainer = styled(View)<TMargin>`
  width: 100%;
  border-radius: 12px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  align-items: center;
  justify-content: center;
  padding: 20px 12px;

  ${props => MARGIN(props)}
`

export const TranslationContainer = styled(View)<TMargin>`
  width: 100%;
  border-radius: 12px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  flex-direction: row;

  ${props => MARGIN(props)}
`

export const ExampleContainer = styled(View)<TMargin>`
  width: 100%;
  border-radius: 12px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  padding: 8px 12px;

  ${props => MARGIN(props)}
`

export const SynonymContainer = styled(View)<TMargin>`
  border-radius: 12px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  padding: 4px 12px;
  flex-direction: row;

  ${props => MARGIN(props)}
`

export const Footer = styled(View)`
  position: absolute;
  bottom: 0px;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: ${({ theme: { insets } }) => insets.bottom + 16}px;
  flex-direction: row;
`
