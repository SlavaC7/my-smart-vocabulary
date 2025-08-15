import React, { useMemo, useState } from 'react'

import { FlatList } from 'react-native'

import { useTranslation } from 'react-i18next'

import { WordFeature } from '@/features'

import { TFolder, useWordStore, WordEntity } from '@/entities/word'

import {
  appPadding,
  Icon,
  Styled,
  Typography,
  useBottomSheetRef,
} from '@/shared'

import { TMyWordsListProps } from './types'

export const MyWordsList = ({ searchTerm }: TMyWordsListProps) => {
  const { t } = useTranslation()
  const { words } = useWordStore()
  const foldersBSRef = useBottomSheetRef()

  const [selectedFolder, setSelectedFolder] = useState<TFolder | null>(null)

  const filteredWords = useMemo(
    () =>
      words.filter(
        word =>
          (!selectedFolder || word.folderId === selectedFolder._id) &&
          (!searchTerm ||
            word.text.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    [words, searchTerm, selectedFolder?._id],
  )

  return (
    <>
      <FlatList
        key={selectedFolder?._id}
        style={{ paddingHorizontal: appPadding }}
        ListHeaderComponent={() => (
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
        )}
        data={filteredWords}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <WordEntity.MyCard
            word={item}
            rightAction={() => <WordFeature.DeleteWord id={item._id} />}
          />
        )}
        ItemSeparatorComponent={() => <Styled.Divider height={8} />}
        ListFooterComponent={() => <Styled.Divider height={100} />}
      />
      <WordFeature.FoldresBS ref={foldersBSRef} onChange={setSelectedFolder} />
    </>
  )
}
