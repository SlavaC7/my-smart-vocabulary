import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { WordFeature } from '@/features'

import { TFolder } from '@/entities/word'

import { Styled, TEColors, Typography, useBottomSheetRef } from '@/shared'

import * as S from './styles'
import { TSelectFoldersProps } from './types'

export const SelectFolders = ({
  value = [],
  onChange = () => {},
}: TSelectFoldersProps) => {
  const { t } = useTranslation()
  const folderBSRef = useBottomSheetRef()

  const folderIds = value.map(item => item._id)

  const array = useMemo(
    () => [{ _id: '1', name: 'All Worlds' } as TFolder, ...value],
    [value],
  )

  const onOpenBS = () => {
    folderBSRef.current?.open()
  }

  const onDeleteOne = (id: string) => {
    if (id === '1') {
      onChange([])
      return
    }

    onChange(value.filter(fol => fol._id !== id))
  }

  const onSelect = (item: TFolder | null) => {
    if (!item) {
      onChange([])
      return
    }
    const isActive = folderIds.includes(item._id)

    if (isActive) {
      onChange(value.filter(fol => fol._id !== item._id))
      return
    }

    onChange([item, ...value])
  }

  const renderItem = (item: TFolder) => {
    const isAll = item._id === '1'
    const isActive = isAll ? !value.length : folderIds.includes(item._id)
    const colors: TEColors = isActive ? 'white' : 'black'

    return (
      <S.Item
        key={item._id}
        mRight={'16px'}
        mBottom={'6px'}
        active={isActive}
        onPress={() => onDeleteOne(item._id)}>
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
        <S.Button mRight={'16px'} onPress={onOpenBS}>
          <Typography.Body1R>Select</Typography.Body1R>
        </S.Button>
        {array.map(renderItem)}
      </Styled.FlexWrapper>

      <WordFeature.FoldersBS
        ref={folderBSRef}
        onChange={onSelect}
        values={folderIds}
        isSelect
        isMultiple
      />
    </>
  )
}
