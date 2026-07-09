import React from 'react'

import { Styled, Typography } from '@/shared'
import { useTranslation } from 'react-i18next'

export const EmptyWords = () => {
  const { t } = useTranslation()
  return (
    <Styled.FlexWrapper flexDirection="column" mTop="20px">
      <Typography.H2 color="white" mBottom="16px">
        {t('empty.quiz.title')}
      </Typography.H2>

      <Typography.Body1R color="white">
        {t('empty.quiz.description')}
      </Typography.Body1R>
    </Styled.FlexWrapper>
  )
}
