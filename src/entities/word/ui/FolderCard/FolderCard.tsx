import React from 'react'

import { Icon, Styled, Typography } from '@/shared'

import * as S from './styles'
import { TFolderCardProps } from './types'

export const FolderCard = ({
  folder,
  isSelected,
  width = '100%',
  hideIcons = false,
  onPress = () => {},
  onPressDeleteFolder = () => {},
}: TFolderCardProps) => {
  const renderIcons = () => {
    if (isSelected) {
      return <Icon name="Done" />
    }

    if (hideIcons) {
      return <></>
    }

    if (!isSelected) {
      return (
        <Styled.Touchable
          width="auto"
          onPress={() => onPressDeleteFolder(folder._id)}>
          <Icon name="Trash" />
        </Styled.Touchable>
      )
    }

    return <></>
  }
  return (
    <S.FolderWrapper
      width={width}
      mBottom="2px"
      onPress={() => onPress(folder)}>
      <Styled.FlexWrapper width="auto">
        <Icon name="FolderDublicate" />
        <Typography.H4 mLeft="4px">{folder.name}</Typography.H4>
        <Typography.H4 color="neutral_300">{` (${folder.count})`}</Typography.H4>
      </Styled.FlexWrapper>

      {renderIcons()}
    </S.FolderWrapper>
  )
}
