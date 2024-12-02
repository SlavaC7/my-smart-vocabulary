import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen'

export const wp = widthPercentageToDP
export const hp = heightPercentageToDP

export const isSmallScreen = wp(100) < 380

export const scaleDimensionsToWidth = (
  currentWidth: number,
  currentHeight: number,
  targetWidth: number,
) => {
  const scaleFactor = targetWidth / currentWidth
  const newHeight = currentHeight * scaleFactor
  return { width: targetWidth, height: newHeight }
}
