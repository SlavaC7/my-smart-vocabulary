import React from 'react'

import { StatusBar } from 'react-native'

import { useTranslation } from 'react-i18next'

import { Header } from '@/widgets/header'

import { QuizFeatures } from '@/features'

import { Background, EColors } from '@/shared'

export const Config = () => {
  const { t } = useTranslation()

  return (
    <Background.Container>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={EColors.transparent}
      />
      <Header.Standard title={t('tests.configuring')} goBack />

      <QuizFeatures.ConfiguringForm />
    </Background.Container>
  )
}
