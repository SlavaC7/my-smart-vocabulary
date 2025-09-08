import { StyleSheet } from 'react-native'

import { EColors } from '@/shared'

export const styles = StyleSheet.create({
  default: {
    borderWidth: 0,
    backgroundColor: EColors.neutral_200,
  },
  correct: {
    backgroundColor: EColors.green_100,
  },
  incorrect: {
    backgroundColor: EColors.red_100,
  },
  incorrectInputText: {
    textDecorationColor: 'black',
    textDecorationLine: 'line-through',
  },
})
