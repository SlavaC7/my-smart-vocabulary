import React from 'react'

import { useTranslation } from 'react-i18next'

import { EWordType, WordEntity } from '@/entities/word'

import { Styled, Typography } from '@/shared'

import { TTypePickerProps } from './types'

const data = [EWordType.word, EWordType.phrase]

export const TypePicker = ({ onChange, value }: TTypePickerProps) => {
  const { t } = useTranslation()
  const renderItem = (item: EWordType) => {
    const active = item === value
    return (
      <WordEntity.TypeCard
        active={active}
        mRight={'16px'}
        type={item}
        size={'standard'}
        onPress={onChange}
        textComponent={'Body2R'}
      />
    )
  }
  return (
    <>
      <Typography.Body2R mBottom={'8px'} color={'neutral_500'}>
        {t('own_translation.type')}
      </Typography.Body2R>

      <Styled.FlexWrapper justify={'flex-start'}>
        {data.map(renderItem)}
      </Styled.FlexWrapper>
    </>
  )
}
