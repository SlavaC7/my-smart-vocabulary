import React, { useEffect, useState } from 'react'

import { FlatList, ListRenderItem } from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

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

  const { bottom } = useSafeAreaInsets()

  const isFocused = useIsFocused()

  const [selectedFolder, setSelectedFolder] = useState<TFolder | null>(null)

  const {
    docs: wordsData,
    flatListProps,
    refresh,
    mutate,
  } = useInfiniteApiQuery(WordsService.getWords, {
    limit: 10,
    payload: { search, folderId: selectedFolder?._id },
    persist: true,
  })

  useEffect(() => {
    isFocused && mutate()
  }, [isFocused])

  const renderItem: ListRenderItem<TWord> = ({ item }) => (
    <WordEntity.MyCard
      word={item}
      rightAction={() => (
        <WordFeature.DeleteWord id={item._id} onDelete={refresh} />
      )}
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
        contentContainerStyle={{ paddingBottom: bottom + 100 }}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Styled.Divider height={8} />}
        {...flatListProps}
      />
      <WordFeature.FoldersBS ref={foldersBSRef} onChange={setSelectedFolder} />
    </>
  )
}
