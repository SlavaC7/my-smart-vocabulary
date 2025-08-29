import { StyleSheet } from 'react-native'

import { EColors } from '@/shared'

export const styles = StyleSheet.create({
  correct: {
    borderColor: EColors.green_200,
    backgroundColor: EColors.green_100,
  },
  incorrect: {
    borderColor: EColors.red_300,
    backgroundColor: EColors.red_100,
  },
})
