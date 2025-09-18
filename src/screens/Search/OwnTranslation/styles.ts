import { StyleSheet, View } from 'react-native'

import styled from 'styled-components'

import { EColors, TMargin, wp } from '@/shared'

export const PaddingWrapper = styled(View)<TMargin>`
  padding: 0px 16px;
`

export const BlueContainer = styled(View)`
  background-color: ${({ theme: { COLORS } }) => COLORS.primary_500};
  width: ${wp(100)}px;
  padding: 10px 16px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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
