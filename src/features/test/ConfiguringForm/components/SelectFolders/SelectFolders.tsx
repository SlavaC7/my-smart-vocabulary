import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { useTypedSelector } from '@/app/store'

import { getWordSelector, TFolder } from '@/entities/word'

import { Styled, TEColors, Typography } from '@/shared'

import * as S from './styles'
import { TSelectFoldersProps } from './types'

export const SelectFolders = ({
  value = [],
  onChange = () => {},
}: TSelectFoldersProps) => {
  const { t } = useTranslation()
  const { folders } = useTypedSelector(getWordSelector)

  const array = useMemo(
    () => [{ _id: '1', name: 'All Worlds' }, ...folders],
    [folders],
  )

  const onSelect = (id: string, active: boolean) => {
    if (id === '1') {
      onChange([])
      return
    }
    if (active) {
      onChange(value.filter(item => item !== id))
      return
    }

    onChange([id, ...value])
  }

  const renderItem = (item: TFolder) => {
    const isAll = item._id === '1'
    const isActive = isAll ? !value.length : value.includes(item._id)
    const colors: TEColors = isActive ? 'white' : 'black'

    return (
      <S.Item
        key={item._id}
        mRight={'16px'}
        active={isActive}
        onPress={() => onSelect(item._id, isActive)}>
        <Typography.Body1R color={colors}>{item.name}</Typography.Body1R>
      </S.Item>
    )
  }
  return (
    <>
      <Typography.H3 mBottom={'16px'} mLeft={'10px'}>
        {t('tests.select_folders')}
      </Typography.H3>
      <Styled.FlexWrapper wrap={'wrap'} justify={'flex-start'}>
        {array.map(renderItem)}
      </Styled.FlexWrapper>
    </>
  )
}
