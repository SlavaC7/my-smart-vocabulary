import React from 'react'

import { FlatList, ListRenderItem } from 'react-native'

import { WordFeature } from '@/features'

import { TWord, useWordStore, WordEntity } from '@/entities/word'

import { TImportListProps } from './types'

export const ImportList = ({ data, setData }: TImportListProps) => {
  const { words } = useWordStore()

  const _onDelete = (id: string) => {
    setData(data.filter(item => item._id !== id))
  }

  const renderItem: ListRenderItem<TWord> = ({ item }) => {
    const isDuplicate = words.map(wr => wr.text).includes(item.text)

    return (
      <WordEntity.MyCard
        word={item}
        duplicate={isDuplicate}
        rightAction={() => (
          <WordFeature.DeleteWord onDelete={() => _onDelete(item._id)} />
        )}
      />
    )
  }

  return (
    <>
      <FlatList
        keyExtractor={item => item._id}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </>
  )
}
