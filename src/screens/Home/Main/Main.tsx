import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useTheme } from 'styled-components'

import { WordFeature } from '@/features/word'

import { Typography } from '@/shared'
import { Background } from '@/shared/ui/background'

import * as UI from './components'
import * as S from './styles'

export const Main = () => {
  const { COLORS } = useTheme()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Background.Container top={0} bottom={0} color={COLORS.background}>
      <S.Header>
        <Typography.H1 color="white">{t('app.name')}</Typography.H1>
        <S.SearchContainer>
          <WordFeature.SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </S.SearchContainer>
      </S.Header>

      <UI.MyWordsList searchTerm={searchTerm} />
    </Background.Container>
  )
}
