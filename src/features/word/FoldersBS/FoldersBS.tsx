import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { ListRenderItem } from 'react-native'

import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useTranslation } from 'react-i18next'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TFolder, useWordStore, WordEntity } from '@/entities/word'

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

import { AddFolderModal } from '../AddFolderModal'

import * as S from './styles'
import { TFoldersBSProps } from './types'

export const FoldersBS = forwardRef<TBottomSheetModalRef, TFoldersBSProps>(
  (
    {
      onChange,
      value = null,
      isSelect = false,
      isMultiple = false,
      values = [],
    },
    ref,
  ) => {
    const bsRef = useBottomSheetRef(ref)
    const modalRef = useRef<TBottomSheetModalRef>(null)
    const { t } = useTranslation()
    const { bottom } = useSafeAreaInsets()
    const { folders, updateFolders, deleteFolder } = useWordStore()
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
      deleteFolder(folderId)
    }, [])

    const onAddFolderClose = () => {
      modalRef.current?.close()
    }

    const renderItem: ListRenderItem<TFolder> = ({ item }) => {
      const isSelected = isMultiple
        ? values.includes(item._id)
        : item._id === selectedFolder
      return (
        <WordEntity.FolderCard
          folder={item}
          hideIcons={isSelect}
          onPress={onPressSelect}
          onPressDeleteFolder={onPressDeleteFolder}
          isSelected={isSelected}
        />
      )
    }

    const renderFooterComponent = () => {
      if (isSelect) {
        return <Styled.FlexWrapper mBottom={`${bottom + 16}px`} />
      }
      return (
        <Styled.FlexWrapper mBottom={`${bottom + 16}px`} mTop="20px">
          <Button.Text
            leftIcon="Plus"
            text={t('folder.new_folder')}
            onPress={onPressAddFolder}
          />
        </Styled.FlexWrapper>
      )
    }
    const isSelectedAllWords = isSelect
      ? isMultiple
        ? values.length === 0
        : !selectedFolder
      : !selectedFolder

    return (
      <>
        <BottomSheet.Modal
          ref={bsRef}
          enableDynamicSizing
          onOpen={updateFolders}
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
                  </Styled.FlexWrapper>

                  {isSelectedAllWords && <Icon name="Done" />}
                </S.FolderWrapper>
              </>
            )}
            renderItem={renderItem}
            ListFooterComponent={renderFooterComponent}
          />
        </BottomSheet.Modal>

        <AddFolderModal ref={modalRef} onClose={onAddFolderClose} />
      </>
    )
  },
)
