import { StyleSheet } from 'react-native'

import { BottomSheetView } from '@gorhom/bottom-sheet'
import styled from 'styled-components'

import { EColors } from '@/shared'

export const Container = styled(BottomSheetView)`
  padding: 0px 16px;
  background-color: transparent;
`

export const styles = StyleSheet.create({
  input: {
    backgroundColor: EColors.white,
  },
})
