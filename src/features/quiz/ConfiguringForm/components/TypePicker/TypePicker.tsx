import React from 'react'

import { useTranslation } from 'react-i18next'

import { EWordType } from '@/entities/word'

import { Styled, Typography } from '@/shared'

import * as S from './styles'
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
  const renderItem = (item: EWordType, index: number) => {
    const active = validateActive(item)

    const isMLeft = index % 2 === 0
    return (
      <S.FilterSelectItem
        mRight={isMLeft ? '8px' : '0px'}
        mLeft={!isMLeft ? '8px' : '0px'}
        active={active}>
        <Typography.Body1R color={active ? 'white' : 'black'}>
          {item}
        </Typography.Body1R>
      </S.FilterSelectItem>
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
