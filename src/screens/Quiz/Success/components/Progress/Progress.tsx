import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  withSequence,
  withDelay,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated'

import { TProgress } from './types'

const percentArray = [0, 20, 50, 80, 100]
const colorArray = [
  '#F44336', // red at 0%
  '#F44336', // red at 20%
  '#FF9800', // orange at 50%
  '#4CAF50', // green at 80%
  '#FFD700', // yellow at 100%
]

export const Progress = ({
  progress,
  height = 10,
  duration = 2000,
}: TProgress) => {
  const [displayValue, setDisplayValue] = useState('')
  const widthProgress = useSharedValue(0)
  const colorProgress = useSharedValue(0)
  const textProgress = useSharedValue(0) // Добавляем анимацию для текста

  useEffect(() => {
    widthProgress.value = withTiming(progress, {
      duration,
      easing: Easing.out(Easing.quad),
    })

    colorProgress.value = withSequence(
      withDelay(
        duration * 0.3,
        withTiming(progress, {
          duration: duration * 0.7,
          easing: Easing.out(Easing.quad),
        }),
      ),
    )

    // Анимация текста от 0 до progress
    textProgress.value = withTiming(progress, {
      duration,
      easing: Easing.out(Easing.quad),
    })
  }, [progress])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${widthProgress.value}%`,
      backgroundColor: interpolateColor(
        colorProgress.value,
        percentArray,
        colorArray,
      ),
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(colorProgress.value, percentArray, colorArray),
    }
  })

  const progressText = useDerivedValue(() => {
    return `${Math.round(textProgress.value)}%`
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue(progressText.value)
    }, 40)
    return () => clearInterval(interval)
  }, [progressText])

  return (
    <>
      <Animated.Text style={[animatedTextStyle, styles.text]}>
        {displayValue}
      </Animated.Text>

      <View style={[styles.container, { height }]}>
        <View style={styles.background} />
        <Animated.View style={[styles.progress, animatedStyle]} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    borderRadius: 5,
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E0E0E0',
  },
  progress: {
    height: '100%',
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
})
