import React, { useEffect, useState } from 'react'

import { StatusBar } from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

// import { Confetti } from 'react-native-fast-confetti'

import { EScreens, EStacks } from '@/app/navigation'

import { Header } from '@/widgets/header'

import { EQuizStatus } from '@/entities/quiz'
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

export const Main = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const { setQuizState, activeQuiz } = useQuizStore()
  const isFocused = useIsFocused()

  const [haveActiveQuiz, setHaveActiveQuiz] = useState(false)

  useEffect(() => {
    if (!isFocused) return

    QuizService.getQuizzes({ status: EQuizStatus.in_progress }).then(data => {
      console.log('getQuizzes', data.data.docs)
      setHaveActiveQuiz(!!data.data.docs[0])
      setQuizState({
        activeQuiz: data.data.docs[0] || null,
      })
    })
  }, [isFocused])

  const onGoHome = () => {
    navigate(EStacks.Home)
  }

  const onGoConfiguring = () => {
    if (!haveActiveQuiz) {
      navigate(EScreens.TestsConfig)

      return
    }

    if (activeQuiz) {
      navigate(EScreens.TestsQuestion)
    }
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
      <StatusBar barStyle={'dark-content'} />

      <Header.Standard goBack onGoBack={onGoHome} />
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
      </Background.Standard>
    </Background.Container>
  )
}
