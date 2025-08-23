import React from 'react'

import { useTranslation } from 'react-i18next'

import { WordFeature } from '@/features'

import { useWordStore, WordEntity } from '@/entities/word'

import { EColors, Icon, Styled, Typography, useBottomSheetRef } from '@/shared'

import * as S from './styles'
import { TWordScreenFolderProps } from './types'

export const SelectFolder = ({
  folder,
  folderId,
  onChange = () => {},
  ...props
}: TWordScreenFolderProps) => {
  const { folders } = useWordStore()
  const { t } = useTranslation()
  const folderBSRef = useBottomSheetRef()

  const currentFolder = folder || folders.find(item => item._id === folderId)

  const onOpenBS = () => {
    folderBSRef.current?.open()
  }

  return (
    <>
      {!currentFolder && (
        <S.AddFolder {...props} onPress={onOpenBS}>
          <Icon name={'Forward'} fill={EColors.neutral_300} />
          <Typography.Body2R color="neutral_300" mLeft="10px">
            {t('folder.move_to_folder')}
          </Typography.Body2R>
        </S.AddFolder>
      )}

      {!!currentFolder && (
        <Styled.FlexWrapper {...props} justify={'space-between'}>
          <WordEntity.FolderCard
            width={'90%'}
            folder={currentFolder}
            isSelected
          />

          <Styled.Touchable width="auto" onPress={onOpenBS}>
            <Icon name="EditFolder" size={24} fill={EColors.neutral_300} />
          </Styled.Touchable>
        </Styled.FlexWrapper>
      )}

      <WordFeature.FoldersBS ref={folderBSRef} onChange={onChange} />
    </>
  )
}
