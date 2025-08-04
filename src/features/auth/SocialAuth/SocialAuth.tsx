import React from 'react'

import { useTranslation } from 'react-i18next'

import { Icon, Styled, Typography } from '@/shared'

import * as S from './styles'

export const SocialAuth = () => {
  const { t } = useTranslation()
  return (
    <Styled.FlexWrapper flexDirection="column">
      <Styled.FlexWrapper mBottom={'16px'}>
        <S.Line />
        <Typography.Body2R mLeft={'16px'} mRight={'16px'}>
          {t('auth.or')}
        </Typography.Body2R>
        <S.Line />
      </Styled.FlexWrapper>
      <S.ButtonContainer>
        <Icon name={'Google'} />

        <Typography.H3 mLeft={'10px'}>{t('auth.google')}</Typography.H3>
      </S.ButtonContainer>

      <S.ButtonContainer mTop={'10px'}>
        <Icon name={'Apple'} />
        <Typography.H3 mLeft={'10px'}>{t('auth.apple')}</Typography.H3>
      </S.ButtonContainer>
    </Styled.FlexWrapper>
  )
}
