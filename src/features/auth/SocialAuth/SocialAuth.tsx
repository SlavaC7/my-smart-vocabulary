import React from 'react'

import { useTranslation } from 'react-i18next'

import { EScreens } from '@/app/navigation'

import { useAuth } from '@/entities/auth'

import { Icon, Styled, Typography, useNavigation } from '@/shared'

import { FirebaseService } from '@/shared/services/firebase'

import * as S from './styles'

export const SocialAuth = () => {
  const { t } = useTranslation()
  const { auth } = useAuth()
  const { navigate } = useNavigation()

  const onGoogle = async () => {
    try {
      navigate(EScreens.AuthCreateProfile)
      // await FirebaseService.signInWithGoogle()
      // console.log('SUCCESS')

      // auth()
    } catch (error) {
      console.log('onGoogle error', { ...error })
    }
  }
  return (
    <Styled.FlexWrapper flexDirection="column">
      <Styled.FlexWrapper mBottom={'16px'}>
        <S.Line />
        <Typography.Body2R mLeft={'16px'} mRight={'16px'}>
          {t('auth.or')}
        </Typography.Body2R>
        <S.Line />
      </Styled.FlexWrapper>
      <S.ButtonContainer onPress={onGoogle}>
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
