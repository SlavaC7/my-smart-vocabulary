import React, { useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'

import { EScreens } from '@/app/navigation'

import { Background, Button, Styled, Typography, useNavigation } from '@/shared'

import * as UI from './components'
import * as S from './styles'

export const Main = () => {
  const { COLORS } = useTheme()
  const { t } = useTranslation()
  const navigation = useNavigation()

  const onPressCreateOwn = useCallback(() => {
    navigation.navigate(EScreens.SearchOwnTranslation)
  }, [])

  return (
    <Background.Container>
      <Styled.Padding mBottom="12px">
        <UI.SearchInput />
      </Styled.Padding>

      <S.TitleSection>
        <Typography.Caption1R
          textTransform="uppercase"
          color={COLORS.neutral_500}>
          {t('search.title')}
        </Typography.Caption1R>
      </S.TitleSection>

      <S.TitleSection mTop="12px">
        <Typography.Caption1R
          textTransform="uppercase"
          color={COLORS.neutral_500}>
          {t('common.other')}
        </Typography.Caption1R>
      </S.TitleSection>

      <Button.Standard
        text={t('own_translation.create')}
        type="tertiary"
        icon="Plus"
        mTop="12px"
        onPress={onPressCreateOwn}
      />
    </Background.Container>
  )
}
