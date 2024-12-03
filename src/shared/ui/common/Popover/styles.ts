import { StyleSheet } from 'react-native'

import { EColors } from '../../styled'

export const popoverStyles = StyleSheet.create({
  shadowIos: {
    backgroundColor: EColors.neutral_100,
    shadowColor: EColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  shadowAndroid: {
    elevation: 3,
  },
  popover: {
    marginTop: 54,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 2,
    backgroundColor: EColors.neutral_100,
    zIndex: 10,
  },
  background: {
    backgroundColor: EColors.transparent,
  },
})

export const styles = StyleSheet.create({
  shadowIos: {
    backgroundColor: EColors.neutral_100,
    shadowColor: EColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  shadowAndroid: {
    elevation: 3,
  },
  popover: {
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 2,
    backgroundColor: EColors.neutral_100,
    zIndex: 10,
  },
  background: {
    backgroundColor: EColors.transparent,
  },
})
