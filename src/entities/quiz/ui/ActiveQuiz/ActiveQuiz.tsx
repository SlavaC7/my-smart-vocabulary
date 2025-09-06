import React from 'react'

import { ActivityIndicator } from 'react-native'

import { useTranslation } from 'react-i18next'

import { EColors, Styled, Typography } from '@/shared'

import * as S from './styles'
import { TActiveQuizProps } from './types'

export const ActiveQuiz = ({ quiz, loading, onComplete }: TActiveQuizProps) => {
  const { t } = useTranslation()
  if (loading) return <ActivityIndicator color={EColors.primary_500} />

  if (!quiz && !loading) return <></>

  return (
    <S.Container>
      <Typography.Body1R mBottom={'10px'}>
        {t('tests.active_test_found')}
      </Typography.Body1R>
      <Styled.FlexWrapper justify={'space-between'}>
        <S.ButtonSection>
          <Typography.Body1R color={'primary_400'}>
            {t('button.continue')}
          </Typography.Body1R>
        </S.ButtonSection>

        <S.ButtonSection onPress={onComplete}>
          <Typography.Body1R color={'primary_400'}>
            {t('button.complete')}
          </Typography.Body1R>
        </S.ButtonSection>
      </Styled.FlexWrapper>
    </S.Container>
  )
}
