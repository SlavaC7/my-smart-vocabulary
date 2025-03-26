import React, { useMemo } from 'react'

import { useTypedSelector } from '@/app/store'

import { getWordSelector, TFolder } from '@/entities/word'

import { Styled, TEColors, Typography } from '@/shared'

import * as S from './styles'
import { TSelectFoldersProps } from './types'

export const SelectFolders = ({
  value = [],
  onChange = () => {},
}: TSelectFoldersProps) => {
  const { folders } = useTypedSelector(getWordSelector)

  const array = useMemo(
    () => [{ _id: '1', name: 'All Worlds' }, ...folders],
    [folders],
  )

  const onSelect = (id: string, active: boolean) => {
    if (active) {
      onChange(value.filter(item => item !== id))
      return
    }

    onChange([id, ...value])
  }

  const renderItem = (item: TFolder) => {
    const isActive = value.includes(item._id)
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
    <Styled.FlexWrapper wrap={'wrap'} justify={'flex-start'}>
      {array.map(renderItem)}
    </Styled.FlexWrapper>
  )
}
