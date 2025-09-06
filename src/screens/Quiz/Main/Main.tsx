import React from 'react'

import { StatusBar } from 'react-native'

import { useTranslation } from 'react-i18next'

import LinearGradient from 'react-native-linear-gradient'

import { QuizEntity, useGetActiveQuiz } from '@/entities/quiz'

import { Background, EColors, Icon, Styled, Typography } from '@/shared'

import { PaddingContainer, styles } from './styles'

import * as UI from './ui'

export const Main = () => {
  const { t } = useTranslation()

  const { activeQuiz, loading, onCompleteActiveTest } = useGetActiveQuiz()

  return (
    <Background.Container color={EColors.white}>
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
        style={styles.gradient}
      />
      <StatusBar barStyle={'dark-content'} />

      <Background.Standard color={'transparent'} style={styles.index}>
        <Styled.FlexWrapper flexDirection={'column'}>
          <Icon name={'Test'} size={120} fill="white" />
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
        </Styled.FlexWrapper>
      </Background.Standard>
    </Background.Container>
  )
}
