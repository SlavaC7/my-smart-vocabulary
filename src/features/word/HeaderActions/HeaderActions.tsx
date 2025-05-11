import React, { useCallback, useRef } from 'react'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { useTheme } from 'styled-components'

import { EScreens } from '@/app/navigation'

import { WordFeature } from '@/features'

import { TFolder, wordActions } from '@/entities/word'

import { delay } from '@/shared'
import { useBottomSheetRef, useNavigation } from '@/shared/hooks'
import { Common } from '@/shared/ui/common'
import { TPopoverRef } from '@/shared/ui/common/Popover'
import { Icon } from '@/shared/ui/Icon'
import { Styled, Typography } from '@/shared/ui/styled'

import * as S from './styles'
import { THeaderActionsProps } from './types'

export const HeaderActions = ({
  wordId,
  folderId,
  onPressEdit,
}: THeaderActionsProps) => {
  const { t } = useTranslation()
  const { COLORS } = useTheme()
  const popoverRef = useRef<TPopoverRef | null>(null)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const folderBSRef = useBottomSheetRef()

  const onPressMove = useCallback(async () => {
    popoverRef.current?.setState({ isVisible: false })

    await delay(500)

    folderBSRef.current?.open()
  }, [wordId])

  const onPressDelete = useCallback(async () => {
    popoverRef.current?.setState({ isVisible: false })

    await delay(500)

    dispatch(wordActions.removeWord(wordId))

    navigation.goBack()
  }, [wordId])

  const onMoveToFolder = useCallback(
    (folder: TFolder | null) => {
      dispatch(
        wordActions.addToFolder({
          folderId: folder?._id || null,
          wordId: wordId,
        }),
      )
    },
    [wordId],
  )

  return (
    <Styled.FlexWrapper width={'auto'}>
      <Styled.Touchable onPress={onPressEdit} mRight="16px" width="auto">
        <Icon name="Edit" />
      </Styled.Touchable>

      <Common.Popover
        ref={popoverRef}
        from={
          <Styled.Touchable width="auto">
            <Icon name="More" />
          </Styled.Touchable>
        }>
        <S.Item onPress={onPressMove}>
          <Icon name="Forward" stroke={COLORS.black} />

          <Typography.Body2R mLeft="8px" color={'black'}>
            {t('button.move')}
          </Typography.Body2R>
        </S.Item>

        <S.Item onPress={onPressDelete}>
          <Icon name="Trash" stroke={COLORS.red_300} />

          <Typography.Body2R mLeft="8px" color={'red_300'}>
            {t('button.delete')}
          </Typography.Body2R>
        </S.Item>
      </Common.Popover>

      <WordFeature.FoldresBS
        ref={folderBSRef}
        onChange={onMoveToFolder}
        value={folderId}
      />
    </Styled.FlexWrapper>
  )
}
