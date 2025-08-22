import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

import { Styled, Typography } from '@/shared'

import * as S from './styles'
import { TTitlesProps } from './types'
export const Titles = ({ result = 100 }: TTitlesProps) => {
  const { t } = useTranslation()

  const shake = useSharedValue(0)

  const startShakeAnimation = () => {
    shake.value = withRepeat(
      withTiming(5, { duration: 50, easing: Easing.linear }),
      40,
      true, // реверсировать
    )

    setTimeout(() => {
      shake.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.quad),
      })
    }, 3000)

    setTimeout(() => {
      startShakeAnimation()
    }, 6000)
  }

  useEffect(() => {
    if (result === 100) {
      startShakeAnimation()
    }

    return () => {
      cancelAnimation(shake)
    }
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shake.value * Math.sin(shake.value * Math.PI),
        },
      ],
    }
  })

  const onGetTitle = () => {
    if (result === 100) {
      return t('test_success.excellent.title')
    }

    if (result > 60) {
      return t('test_success.good.title')
    }

    return t('test_success.norm.title')
  }

  const onGetDesc = () => {
    if (result === 100) {
      return t('test_success.excellent.description')
    }

    if (result > 60) {
      return t('test_success.good.description')
    }

    return t('test_success.norm.description')
  }

  return (
    <Styled.FlexWrapper mBottom={'30px'} mTop={'50px'} flexDirection={'column'}>
      <S.AnimatedTitle style={[animatedStyle]}>{onGetTitle()}</S.AnimatedTitle>
      <Typography.H3 align={'center'}>{onGetDesc()}</Typography.H3>
    </Styled.FlexWrapper>
  )
}
