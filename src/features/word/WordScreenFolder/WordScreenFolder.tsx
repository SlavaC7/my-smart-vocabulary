import React, { useCallback } from 'react'

import { WordFeature } from '@/features'

import { TFolder, WordEntity, WordsService } from '@/entities/word'

import { EColors, Icon, Styled, Typography, useBottomSheetRef } from '@/shared'

import * as S from './styles'
import { TWordScreenFolderProps } from './types'

export const WordScreenFolder = ({
  folder,
  wordId,
  refresh = () => {},
}: TWordScreenFolderProps) => {
  const folderBSRef = useBottomSheetRef()

  const onOpenBS = () => {
    folderBSRef.current?.open()
  }
  const onMoveToFolder = useCallback(
    async (newFolder: TFolder | null) => {
      try {
        await WordsService.patchWord({
          id: wordId,
          folderId: newFolder?._id || '',
        })
        refresh()
      } catch (error) {
        console.log('onMoveToFolder error =>', error)
      }
    },
    [wordId],
  )
  return (
    <>
      {!folder && (
        <S.AddFolder onPress={onOpenBS}>
          <Icon name={'Forward'} fill={EColors.neutral_300} />
          <Typography.Body2R color="neutral_300" mLeft="10px">
            Move to Folder
          </Typography.Body2R>
        </S.AddFolder>
      )}

      {!!folder && (
        <Styled.FlexWrapper justify={'space-between'}>
          <WordEntity.FolderCard width={'90%'} folder={folder} isSelected />

          <Styled.Touchable width="auto" onPress={onOpenBS}>
            <Icon name="EditFolder" size={24} fill={EColors.neutral_300} />
          </Styled.Touchable>
        </Styled.FlexWrapper>
      )}

      <WordFeature.FoldersBS ref={folderBSRef} onChange={onMoveToFolder} />
    </>
  )
}
