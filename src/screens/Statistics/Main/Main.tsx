import React from 'react'

import { useTranslation } from 'react-i18next'

import { useTheme } from 'styled-components'

import { Header } from '@/widgets/header'

import { Background } from '@/shared'

export const Main = () => {
  const { t } = useTranslation()
  const { COLORS } = useTheme()

  return (
    <Background.Container color={COLORS.background}>
      <Header.Standard
        title={t('statistics.title')}
        color={COLORS.background}
      />
    </Background.Container>
  )
}
