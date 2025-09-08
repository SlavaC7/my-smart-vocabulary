import React, { useState } from 'react'

import { StatusBar } from 'react-native'

import { useTranslation } from 'react-i18next'

import { useTheme } from 'styled-components'

import { EScreens } from '@/app/navigation'

import { WordFeature } from '@/features'

import { EColors, Icon, Styled, Typography, useNavigation, wp } from '@/shared'
import { Background } from '@/shared/ui/background'

import * as UI from './components'
import * as S from './styles'

export const Main = () => {
  const { COLORS } = useTheme()
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const [searchTerm, setSearchTerm] = useState('')

  const onCreate = () => {
    navigate(EScreens.SearchOwnTranslation, { isHome: true })
  }

  return (
    <Background.Container top={0} bottom={0} color={COLORS.background}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={EColors.primary_500}
      />
      <S.Header>
        <Styled.FlexWrapper justify={'space-between'}>
          <Typography.H1 color="white">{t('app.name')}</Typography.H1>

          <S.PlusContainer onPress={onCreate}>
            <Icon name={'Plus'} size={30} />
          </S.PlusContainer>
        </Styled.FlexWrapper>
        <S.SearchContainer>
          <WordFeature.SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </S.SearchContainer>
      </S.Header>

      <UI.MyWordsList search={searchTerm} />
    </Background.Container>
  )
}
