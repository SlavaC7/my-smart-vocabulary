import React, { useState } from 'react'

import { FlatList, ListRenderItem } from 'react-native'

import { useTranslation } from 'react-i18next'

import { WordFeature } from '@/features'

import { TFolder, TWord, WordEntity, WordsService } from '@/entities/word'

import {
  appPadding,
  Icon,
  Styled,
  Typography,
  useBottomSheetRef,
} from '@/shared'

import { useInfiniteApiQuery } from '@/shared/hooks/useApi'

import { TMyWordsListProps } from './types'

export const MyWordsList = ({ search }: TMyWordsListProps) => {
  const { t } = useTranslation()
  const foldersBSRef = useBottomSheetRef()

  const { docs: wordsData, flatListProps } = useInfiniteApiQuery(
    WordsService.getWords,
    {
      limit: 10,
      payload: { search },
      persist: true,
    },
  )

  const [selectedFolder, setSelectedFolder] = useState<TFolder | null>(null)

  const renderItem: ListRenderItem<TWord> = ({ item }) => (
    <WordEntity.MyCard
      word={item}
      rightAction={() => <WordFeature.DeleteWord id={item._id} />}
    />
  )

  const renderHeader = () => (
    <Styled.Touchable
      mTop="22px"
      mBottom="12px"
      justify="flex-start"
      onPress={() => foldersBSRef.current?.open()}
      width="auto">
      <Typography.H2 mRight="4px">
        {selectedFolder?.name || t('folder.my_words')}
      </Typography.H2>
      <Icon name="ExpandDown" />
    </Styled.Touchable>
  )

  return (
    <>
      <FlatList
        key={selectedFolder?._id}
        style={{ paddingHorizontal: appPadding }}
        ListHeaderComponent={renderHeader}
        data={wordsData}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Styled.Divider height={8} />}
        // ListFooterComponent={() => <Styled.Divider height={100} />}
        {...flatListProps}
      />
      <WordFeature.FoldresBS ref={foldersBSRef} onChange={setSelectedFolder} />
    </>
  )
}
