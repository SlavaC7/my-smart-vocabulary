import React from 'react'

import { useTranslation } from 'react-i18next'

import { Icon, Input, Styled, Typography, wp } from '@/shared'

export const PhoneAuth = () => {
  const { t } = useTranslation()
  return (
    <Styled.FlexWrapper flexDirection="column">
      <Styled.FlexWrapper mTop={'40px'} mBottom={'26px'}>
        <Icon name={'Auth'} width={wp(100) - 32} height={wp(100) / 2} />
      </Styled.FlexWrapper>

      <Typography.H1>{t('auth.welcome')}</Typography.H1>

      <Input.CountryPhone />
    </Styled.FlexWrapper>
  )
}
