import React from 'react'

import { useTranslation } from 'react-i18next'

import { useAuth } from '@/entities/auth'

import { errorHandler, Icon, isIos, Styled, Typography } from '@/shared'

import { FirebaseService } from '@/shared/services/firebase'

import * as S from './styles'

export const SocialAuth = () => {
  const { t } = useTranslation()
  const { auth } = useAuth()

  const onGoogle = async () => {
    try {
      await FirebaseService.signInWithGoogle()

      auth()
    } catch (error) {
      errorHandler({
        error: error,
        name: 'onGoogle',
      })
    }
  }
  return (
    <Styled.FlexWrapper mTop="16px" flexDirection="column">
      {/* <Styled.FlexWrapper mBottom={'16px'}>
        <S.Line />
        <Typography.Body2R mLeft={'16px'} mRight={'16px'}>
          {t('auth.or')}
        </Typography.Body2R>
        <S.Line />
      </Styled.FlexWrapper> */}
      <S.ButtonContainer onPress={onGoogle}>
        <Icon name={'Google'} />

        <Typography.H3 mLeft={'10px'}>{t('auth.google')}</Typography.H3>
      </S.ButtonContainer>

      {isIos && (
        <S.ButtonContainer mTop={'10px'}>
          <Icon name={'Apple'} />
          <Typography.H3 mLeft={'10px'}>{t('auth.apple')}</Typography.H3>
        </S.ButtonContainer>
      )}
    </Styled.FlexWrapper>
  )
}
