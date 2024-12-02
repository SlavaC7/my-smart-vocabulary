import React, { ComponentProps } from 'react'

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { useAnimatedReaction, useSharedValue } from 'react-native-reanimated'

export const AntiFlickerBottomSheetBackdrop = (
  props: BottomSheetBackdropProps & ComponentProps<typeof BottomSheetBackdrop>,
) => {
  const adjustedAnimatedIndex = useSharedValue(0)
  // when it opening it start from -1 to 0
  // when it closing it start from 0 to -1
  //  0: is open  -1: is close
  // when the error happen it jump directly from 0 to -1
  // when the problem end it jump back from -1 to 0
  useAnimatedReaction(
    () => props.animatedIndex.value,
    (prepared, pre) => {
      if (pre === null) {
        // initial state
        adjustedAnimatedIndex.value = prepared
        return
      }

      const jumpForward = prepared - pre === 1
      const jumpBackward = pre - prepared === 1

      if (pre !== prepared && !jumpBackward && !jumpForward) {
        adjustedAnimatedIndex.value = prepared
      }
    },
  )
  return (
    <BottomSheetBackdrop {...props} animatedIndex={adjustedAnimatedIndex} />
  )
}
