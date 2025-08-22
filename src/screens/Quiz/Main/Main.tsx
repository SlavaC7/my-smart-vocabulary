import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

// import { Confetti } from 'react-native-fast-confetti'

import { EScreens } from '@/app/navigation'

import { Header } from '@/widgets/header'

import { QuizService } from '@/entities/quiz/services'
import { useQuizStore } from '@/entities/quiz/store'

import {
  Background,
  Button,
  EColors,
  Icon,
  Styled,
  Typography,
  useNavigation,
} from '@/shared'

import { styles } from './styles'

export const Main = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const { correctAnswers, incorrectAnswers, totalAnswers } = useQuizStore()

  const [haveActiveQuiz, setHaveActiveQuiz] = useState(false)

  useEffect(() => {
    QuizService.getActiveQuiz().then(data => {
      setHaveActiveQuiz(!!data.data)
    })
  }, [])

  const correctPercent =
    !!correctAnswers && totalAnswers ? (correctAnswers / totalAnswers) * 100 : 0
  const incorrectPercent =
    !!incorrectAnswers && totalAnswers
      ? (incorrectAnswers / totalAnswers) * 100
      : 0

  const onGoConfiguring = () => {
    navigate(EScreens.TestsConfig)
  }

  const onClear = () => {
    // dispatch(
    //   testsActions.setState({
    //     correctAnswers: 0,
    //     incorrectAnswers: 0,
    //     totalAnswers: 0,
    //   }),
    // )
  }
  return (
    <Background.Container>
      <Header.Standard goBack />
      <Background.Standard>
        <Styled.FlexWrapper flexDirection={'column'}>
          <Icon name={'Test'} size={100} />
          <Typography.H1 mTop={'16px'}>
            {t('tests.test_your_knowledge')}
          </Typography.H1>

          <Button.Standard
            width={'auto'}
            mTop={'16px'}
            onPress={onGoConfiguring}
            text={t('button.start')}
          />
        </Styled.FlexWrapper>

        <Styled.Hr mTop={'16px'} height={6} color={EColors.neutral_200} />

        <Styled.FlexWrapper style={styles.container} flexDirection={'column'}>
          <Typography.H2 mTop={'16px'} mBottom={'20px'}>
            {t('statistics.title')}
          </Typography.H2>

          <Styled.FlexWrapper flexDirection={'column'} align={'flex-start'}>
            <Typography.H3 mBottom={'12px'}>
              {t('tests.total_answers')}:{' '}
              <Typography.H3>{totalAnswers}</Typography.H3>
            </Typography.H3>
            <Typography.H3 mBottom={'12px'}>
              {t('tests.correct_answers')}:{' '}
              <Typography.H3 color={'green_300'}>
                {correctAnswers}
              </Typography.H3>{' '}
              (
              <Typography.H3 color={'green_300'}>
                {correctPercent.toFixed(1)} %
              </Typography.H3>
              )
            </Typography.H3>
            <Typography.H3 mBottom={'12px'}>
              {t('tests.incorrect_answers')}:{' '}
              <Typography.H3 color={'red_400'}>
                {incorrectAnswers}
              </Typography.H3>{' '}
              (
              <Typography.H3 color={'red_400'}>
                {incorrectPercent.toFixed(1)} %
              </Typography.H3>
              )
            </Typography.H3>
          </Styled.FlexWrapper>

          <Button.Standard text={'Clear Stats (text)'} onPress={onClear} />
        </Styled.FlexWrapper>
      </Background.Standard>
    </Background.Container>
  )
}
