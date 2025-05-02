import React from 'react'

import { useTranslation } from 'react-i18next'

import { EWordType, WordEntity } from '@/entities/word'

import { Styled, Typography } from '@/shared'

import { TTypePickerProps } from './types'

const data = [EWordType.word, EWordType.phrase]

export const TypePicker = ({ onChange, value }: TTypePickerProps) => {
  const { t } = useTranslation()

  const validateActive = (item: EWordType) => {
    if (Array.isArray(value)) {
      return value.includes(item)
    }

    return item === value
  }

  const _onChange = (item: EWordType, isActive: boolean) => {
    if (Array.isArray(value)) {
      if (isActive) {
        onChange(value.filter(fil => fil !== item))
        return
      }
      onChange([...value, item])
      return
    }

    onChange(item)
  }
  const renderItem = (item: EWordType) => {
    const active = validateActive(item)
    return (
      <WordEntity.TypeCard
        key={item}
        active={active}
        mRight={'16px'}
        type={item}
        size={'standard'}
        onPress={() => _onChange(item, active)}
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
