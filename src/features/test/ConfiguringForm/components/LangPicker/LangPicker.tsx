import React from 'react'

import { useTranslation } from 'react-i18next'

import { langsArray, TLangArray } from '@/entities/word/utils'

import { Styled, TEColors, Typography } from '@/shared'

import * as S from './styles'
import { TSelectFoldersProps } from './types'

export const LangPicker = ({
  value = [],
  onChange = () => {},
}: TSelectFoldersProps) => {
  const { t } = useTranslation()

  const onSelect = (id: string, active: boolean) => {
    if (active) {
      onChange(value.filter(item => item !== id))
      return
    }

    onChange([id, ...value])
  }

  const renderItem = (item: TLangArray) => {
    const isActive = value.includes(item.code)
    const colors: TEColors = isActive ? 'white' : 'black'

    return (
      <S.Item
        key={item.code}
        mRight={'16px'}
        active={isActive}
        onPress={() => onSelect(item.code, isActive)}>
        <Typography.Body1R>{item.flag}</Typography.Body1R>

        <Typography.Body1R color={colors}>{item.code}</Typography.Body1R>
      </S.Item>
    )
  }
  return (
    <>
      <Typography.Body2R mTop={'16px'} mBottom={'8px'} color={'neutral_500'}>
        {t('own_translation.language')}
      </Typography.Body2R>
      <Styled.FlexWrapper wrap={'wrap'} justify={'flex-start'}>
        {langsArray.map(renderItem)}
      </Styled.FlexWrapper>
    </>
  )
}
