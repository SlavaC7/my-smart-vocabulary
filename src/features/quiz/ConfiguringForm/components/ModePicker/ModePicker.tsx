import React from 'react'

import { useTranslation } from 'react-i18next'

import { EQuizItemMode } from '@/entities/quiz'

import { Styled, Typography } from '@/shared'

import * as S from './styles'

import { TTypePickerProps } from './types'

const data = [EQuizItemMode.match, EQuizItemMode.write_word]

export const ModePicker = ({ onChange, value }: TTypePickerProps) => {
  const { t } = useTranslation()

  const _onChange = (item: EQuizItemMode, isActive: boolean) => {
    if (isActive) {
      onChange(value.filter(fil => fil !== item))
      return
    }
    onChange([...value, item])
    return
  }
  const renderItem = (item: EQuizItemMode) => {
    const active = value.includes(item)
    return (
      <S.ItemContainer
        key={item}
        active={active}
        onPress={() => _onChange(item, active)}>
        <Typography.Caption1R color={active ? 'white' : 'black'}>
          {t(`quiz_mode.${item}`)}
        </Typography.Caption1R>
      </S.ItemContainer>
    )
  }
  return (
    <>
      <Typography.Body2R mBottom={'8px'} mTop={'16px'} color={'neutral_500'}>
        {t('own_translation.type')}
      </Typography.Body2R>

      <Styled.FlexWrapper justify={'flex-start'}>
        {data.map(renderItem)}
      </Styled.FlexWrapper>
    </>
  )
}
