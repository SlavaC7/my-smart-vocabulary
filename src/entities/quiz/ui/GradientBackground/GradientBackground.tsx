import React from 'react'
import { StyleSheet } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { EColors, hp, wp } from '@/shared'

import { TGradientBackgroundProps } from './types'

export const GradientBackground = ({
  index = -1,
}: TGradientBackgroundProps) => {
  return (
    <LinearGradient
      colors={[
        EColors.primary_500,
        EColors.primary_400,
        EColors.primary_300,
        EColors.primary_200,
        EColors.primary_100,
        EColors.white,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.main, { zIndex: index }]}
    />
  )
}

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: 0,
    width: wp(100),
    height: hp(90),
  },
})
