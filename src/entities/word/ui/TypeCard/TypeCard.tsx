import React from 'react'

import { useTranslation } from 'react-i18next'

import { Typography } from '@/shared'

import * as S from './styles'

import { TTypeCardProps } from './types'

export const TypeCard = ({
  active = false,
  type,
  onPress = () => {},
  textComponent = 'Caption1R',
  size = 'small',
  ...props
}: TTypeCardProps) => {
  const { t } = useTranslation()

  const Text = Typography[textComponent]
  return (
    <S.ItemContainer
      {...props}
      size={size}
      active={active}
      onPress={() => onPress(type)}>
      <Text color={active ? 'white' : 'black'}>{t(`word_type.${type}`)}</Text>
    </S.ItemContainer>
  )
}
