import React from 'react'

import { useTranslation } from 'react-i18next'

import { EWordType, WordEntity } from '@/entities/word'

import { Styled, Typography } from '@/shared'

import { TTypePickerProps } from './types'

const data = [EWordType.word, EWordType.phrase]

export const TypePicker = ({
  onChange = () => {},
  onChangeArray = () => {},
  value,
  hideLabel = false,
  ...props
}: TTypePickerProps) => {
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
        onChangeArray(value.filter(fil => fil !== item))
        return
      }
      onChangeArray([...value, item])
      return
    }

    onChange(item)
  }
  const renderItem = (item: EWordType, index: number) => {
    const active = validateActive(item)

    const isMLeft = index % 2 === 0
    return (
      <WordEntity.SelectType
        key={item}
        mRight={isMLeft ? '8px' : '0px'}
        mLeft={!isMLeft ? '8px' : '0px'}
        active={active}
        onPress={() => _onChange(item, active)}
        text={item}
      />
    )
  }
  return (
    <Styled.FlexWrapper flexDirection="column" align="flex-start" {...props}>
      {!hideLabel && (
        <Typography.Body2R mBottom={'8px'} color={'neutral_500'}>
          {t('own_translation.type')}
        </Typography.Body2R>
      )}

      <Styled.FlexWrapper justify={'flex-start'}>
        {data.map(renderItem)}
      </Styled.FlexWrapper>
    </Styled.FlexWrapper>
  )
}
