import React from 'react'

import { useTranslation } from 'react-i18next'

import { EWordType } from '@/entities/word'

import { Styled, Typography } from '@/shared'

import * as S from './styles'
import { TTypePickerProps } from './types'

const data = [EWordType.word, EWordType.phrase]

export const TypePicker = ({ onChange, value }: TTypePickerProps) => {
  const { t } = useTranslation()
  const renderItem = (item: EWordType) => {
    const active = item === value
    return (
      <S.ItemContainer
        key={item}
        active={active}
        onPress={() => onChange(item)}>
        <Typography.Body2R color={active ? 'white' : 'black'}>
          {t(`word_type.${item}`)}
        </Typography.Body2R>
      </S.ItemContainer>
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
