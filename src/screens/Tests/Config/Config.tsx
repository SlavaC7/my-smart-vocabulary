import React from 'react'

import { useTranslation } from 'react-i18next'

import { Header } from '@/widgets/header'

import { Background } from '@/shared'

export const Config = () => {
  const { t } = useTranslation()
  return (
    <Background.Container>
      <Header.Standard title={t('tests.configuring')} goBack />

      <Background.Scroll>
        <></>
      </Background.Scroll>
    </Background.Container>
  )
}
