import React, { useRef } from 'react'

import LottieView from 'lottie-react-native'

import { useTranslation } from 'react-i18next'

import { EScreens } from '@/app/navigation'

import { useQuizStore } from '@/entities/quiz/store'

import { Background, Button, Styled, Typography, useNavigation } from '@/shared'

import * as C from './components'
import { styles } from './styles'

export const Success = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const animationRef = useRef<LottieView>(null)

  const { activeQuiz } = useQuizStore()

  const totalCount = test.length

  const currentAnswer = activeQuiz?.userAnswers.filter(
    item => item.isCorrect,
  ).length

  const correctPercent = +(
    !!currentAnswer && totalCount ? (currentAnswer / totalCount) * 100 : 0
  ).toFixed(0)

  const onGoHome = () => {
    navigate(EScreens.TestsMain)
    navigate(EScreens.HomeMain)
  }

  return (
    <Background.Container>
      <Background.Standard pHorizontal={16}>
        <Styled.FlexWrapper
          style={styles.container}
          flexDirection={'column'}
          height={'80%'}>
          <C.Titles result={correctPercent} />

          <C.Progress progress={correctPercent} />

          <Typography.Body1R mTop={'16px'} align={'center'}>
            {t('test_success.new_quiz')}
          </Typography.Body1R>

          <Button.Standard
            text={'Home'}
            mTop={'16px'}
            onPress={onGoHome}
            width={'auto'}
          />
        </Styled.FlexWrapper>
        <LottieView
          ref={animationRef}
          style={styles.lottie}
          resizeMode={'cover'}
          autoPlay
          loop
          source={require('../../../../assets/lottie/confetti.json')}
        />
      </Background.Standard>
    </Background.Container>
  )
}
