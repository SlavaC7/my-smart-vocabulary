import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useTranslation } from 'react-i18next'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useDispatch } from 'react-redux'

import { useTypedSelector } from '@/app/store'

import { getWordSelector, TFolder, wordActions } from '@/entities/word'

import {
  appPadding,
  Button,
  hp,
  Icon,
  Styled,
  Typography,
  useBottomSheetRef,
} from '@/shared'
import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetModalRef } from '@/shared/ui/bottomSheet/Modal'

import { TBaseModalRef } from '@/shared/ui/modal/Base'

import { AddFolderModal } from '../AddFolderModal'

import * as S from './styles'
import { TFoldersBSProps } from './types'

export const FoldresBS = forwardRef<TBottomSheetModalRef, TFoldersBSProps>(
  ({ onChange, value = null }, ref) => {
    const bsRef = useBottomSheetRef(ref)
    const modalRef = useRef<TBaseModalRef>(null)
    const { t } = useTranslation()
    const { bottom } = useSafeAreaInsets()
    const dispatch = useDispatch()
    const { folders, words } = useTypedSelector(getWordSelector)
    const [selectedFolder, setSelectedFolder] = useState<string | null>(value)

    useEffect(() => {
      setSelectedFolder(value)
    }, [value])

    const onPressAddFolder = () => {
      modalRef.current?.open()
    }

    const onPressSelect = (folder: null | TFolder) => {
      setSelectedFolder(folder?._id || null)
      onChange?.(folder)

      bsRef.current?.close()
    }

    const onPressDeleteFolder = useCallback((folderId: string) => {
      dispatch(wordActions.removeFolder(folderId))
    }, [])

    return (
      <>
        <BottomSheet.Modal
          ref={bsRef}
          enableDynamicSizing
          maxDynamicContentSize={hp(80)}>
          <BottomSheetFlatList
            style={{ paddingHorizontal: appPadding }}
            data={folders}
            keyExtractor={item => item._id}
            ListHeaderComponent={() => (
              <>
                <Typography.H2 mBottom="16px">
                  {t('folder.folders')}
                </Typography.H2>

                <S.FolderWrapper
                  mBottom="2px"
                  onPress={() => onPressSelect(null)}>
                  <Styled.FlexWrapper width="auto">
                    <Icon name="FolderDublicate" />
                    <Typography.H4 mLeft="4px">
                      {t('folder.my_words')}
                    </Typography.H4>
                    <Typography.H4 color="neutral_300">{` / ${words.length}`}</Typography.H4>
                  </Styled.FlexWrapper>

                  {!selectedFolder && <Icon name="Done" />}
                </S.FolderWrapper>
              </>
            )}
            renderItem={({ item }) => (
              <S.FolderWrapper
                mBottom="2px"
                onPress={() => onPressSelect(item)}>
                <Styled.FlexWrapper width="auto">
                  <Icon name="FolderDublicate" />
                  <Typography.H4 mLeft="4px">{item.name}</Typography.H4>
                  <Typography.H4 color="neutral_300">{` / ${words.reduce(
                    (st, val) => st + +(val.folderId === item._id),
                    0,
                  )}`}</Typography.H4>
                </Styled.FlexWrapper>

                {selectedFolder === item._id && <Icon name="Done" />}

                {!(selectedFolder === item._id) && (
                  <Styled.Touchable
                    width="auto"
                    onPress={() => onPressDeleteFolder(item._id)}>
                    <Icon name="Trash" />
                  </Styled.Touchable>
                )}
              </S.FolderWrapper>
            )}
            ListFooterComponent={() => (
              <Styled.FlexWrapper mBottom={`${bottom + 16}px`} mTop="20px">
                <Button.Text
                  leftIcon="Plus"
                  text={t('folder.new_folder')}
                  onPress={onPressAddFolder}
                />
              </Styled.FlexWrapper>
            )}
          />
        </BottomSheet.Modal>

        <AddFolderModal ref={modalRef} />
      </>
    )
  },
)
