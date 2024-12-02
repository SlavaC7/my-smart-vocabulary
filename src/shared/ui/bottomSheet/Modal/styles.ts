import { StyleSheet } from 'react-native'

import { EColors } from '../../styled'

export const getStyles = () =>
  StyleSheet.create({
    background: {
      backgroundColor: EColors.neutral_100,
    },
    indicator: { backgroundColor: EColors.neutral_300, width: 46, height: 4 },
    contentContainer: { paddingBottom: 100 },
  })

export const styles = StyleSheet.create({
  background: { backgroundColor: EColors.neutral_100 },
  indicator: { backgroundColor: EColors.neutral_300, width: 46, height: 4 },
  contentContainer: { paddingBottom: 100 },
})
