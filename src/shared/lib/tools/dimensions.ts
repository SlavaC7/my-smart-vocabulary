import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen'

export const wp = widthPercentageToDP
export const hp = heightPercentageToDP

export const isSmallScreen = wp(100) < 380
