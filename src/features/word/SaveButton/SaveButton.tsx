import React, { useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { Icon, Styled, Typography } from '@/shared'

import * as S from './styles'
import { TSaveButtonProps } from './types'

export const SaveButton = ({
  word,
  variant = 'default',
  ...props
}: TSaveButtonProps) => {
  const { t } = useTranslation()

  const onPressSave = useCallback(() => {
    // dispatch(wordActions.addWord(word))
  }, [word])

  if (variant === 'plus') {
    return (
      <Styled.Touchable {...props} onPress={onPressSave} width="auto">
        <Icon name="Plus" />
      </Styled.Touchable>
    )
  }
  return (
    <S.Container {...props} onPress={onPressSave}>
      <Icon name="Plus" />

      <Typography.Body1R color="primary_500" mLeft="4px">
        {t('button.add')}
      </Typography.Body1R>
    </S.Container>
  )
}
