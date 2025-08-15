import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { TFolder, useWordStore } from '@/entities/word'

import { Styled, TEColors, Typography } from '@/shared'

import * as S from './styles'
import { TSelectFoldersProps } from './types'

export const SelectFolders = ({
  value = [],
  onChange = () => {},
}: TSelectFoldersProps) => {
  const { t } = useTranslation()
  const { folders } = useWordStore()

  console.log('value =>', value)

  const array = useMemo(
    () => [{ _id: '1', name: 'All Worlds' }, ...folders],
    [folders],
  )

  const onSelect = (id: string, active: boolean) => {
    console.log('onSelect =>', id, active)

    if (id === '1') {
      onChange([])
      return
    }
    if (active) {
      onChange(value.filter(item => item !== id))
      return
    }

    console.log('onSelect =>', [id, ...value])

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
      <Typography.Body2R mBottom={'16px'} color={'neutral_500'}>
        {t('tests.select_folders')}
      </Typography.Body2R>
      <Styled.FlexWrapper wrap={'wrap'} justify={'flex-start'}>
        {array.map(renderItem)}
      </Styled.FlexWrapper>
    </>
  )
}
