import React, { useEffect } from 'react'

import { StatusBar } from 'react-native'

import { useTranslation } from 'react-i18next'

import { QuizEntity, useGetActiveQuiz } from '@/entities/quiz'

import { Background, EColors, Icon, Styled, Typography } from '@/shared'

import { PaddingContainer, styles } from './styles'

import * as UI from './ui'
import { useUserStore } from '@/entities/user'
import { useIsFocused } from '@react-navigation/native'

export const Main = () => {
  const { t } = useTranslation()
  const isFocused = useIsFocused()

  const { activeQuiz, loading, onCompleteActiveTest } = useGetActiveQuiz()
  const { words, getStats } = useUserStore()

  useEffect(() => {
    isFocused && getStats()
  }, [isFocused])

  const isActive = words >= 10

  return (
    <Background.Container color={EColors.white}>
      <QuizEntity.GradientBackground index={1} />

      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={EColors.transparent}
      />

      <Background.Standard color={'transparent'} style={styles.index}>
        <Styled.FlexWrapper flexDirection={'column'}>
          <Icon name={'AppIconWhite'} size={120} />

          {!isActive && <QuizEntity.EmptyWords />}

          {!!isActive && (
            <>
              <Typography.H1 color={'white'} mTop={'16px'}>
                {t('tests.ready_to_test')}
              </Typography.H1>

              <Typography.H2 color={'white'} mTop={'10px'} mBottom={'30px'}>
                {t('tests.choose_mode')}
              </Typography.H2>

              <PaddingContainer>
                <UI.Modes loading={loading} quiz={!!activeQuiz} />

                <QuizEntity.ActiveQuiz
                  loading={loading}
                  quiz={activeQuiz}
                  onComplete={onCompleteActiveTest}
                />
              </PaddingContainer>
            </>
          )}
        </Styled.FlexWrapper>
      </Background.Standard>
    </Background.Container>
  )
}
