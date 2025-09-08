import { StyleSheet } from 'react-native'

import { EColors } from '@/shared/ui/styled'

export const styles = StyleSheet.create({
  toastContainer: {
    paddingHorizontal: 15,
  },
  errorToast: {
    borderLeftColor: EColors.red_300,
    padding: 10,
    backgroundColor: EColors.white,
  },
  successToast: {
    borderLeftColor: EColors.green_300,
    padding: 10,
    backgroundColor: EColors.white,
  },
  infoToast: {
    borderLeftColor: EColors.primary_600,
    padding: 10,
    backgroundColor: EColors.white,
  },
  text1: {
    fontSize: 18,
    color: EColors.black,
  },
  text2: {
    fontSize: 16,
    color: EColors.neutral_600,
  },
})
