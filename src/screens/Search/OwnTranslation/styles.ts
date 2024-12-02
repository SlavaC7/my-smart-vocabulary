import { StyleSheet, View } from 'react-native'

import styled from 'styled-components'

import { EColors, MARGIN, TMargin } from '@/shared'

export const LogoWrapper = styled(View)<TMargin>`
  height: 82px;
  width: 82px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  ${props => MARGIN(props)}
  align-self: center;
`

export const getStyles = (COLORS: typeof EColors) =>
  StyleSheet.create({
    inputContainer: {
      backgroundColor: COLORS.white,
    },
    flex1: {
      flex: 1,
    },
  })
