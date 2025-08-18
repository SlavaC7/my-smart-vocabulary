import React, { forwardRef, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { FoldersService, useWordStore } from '@/entities/word'

import { Button, Input, Styled, Typography } from '@/shared'
import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetModalRef } from '@/shared/ui/bottomSheet/Modal'

import { Container, styles } from './styles'
import { TAddFolderModalProps } from './types'

export const AddFolderModal = forwardRef<
  TBottomSheetModalRef,
  TAddFolderModalProps
>(({ onClose = () => {} }, ref) => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const { setFolder } = useWordStore()

  const onClearText = () => {
    setValue('')
  }

  const onAdd = async () => {
    try {
      if (!value) return

      const { data } = await FoldersService.postFolder({
        name: value,
      })

      setFolder(data)

      onClearText()
      onClose()
    } catch (error) {
      console.log('onAddFolder error =>', error)
    }
  }

  return (
    <BottomSheet.Modal
      android_keyboardInputMode={'adjustResize'}
      snapPoints={['30%']}
      enableDynamicSizing
      ref={ref}>
      <Container>
        <Styled.FlexWrapper flexDirection={'column'} align={'flex-start'}>
          <Typography.H3 mBottom={'16px'}>
            {t('folder.new_folder')}
          </Typography.H3>
          <Input.Standard
            onChange={setValue}
            value={value}
            label={t('folder.enter_folder_name')}
            isBottomSheet
            inputContainerStyle={styles.input}
            onPressRightIcon={onClearText}
            mBottom={'16px'}
          />

          <Button.Standard
            text={t('button.add')}
            mBottom={'20px'}
            onPress={onAdd}
          />
        </Styled.FlexWrapper>
      </Container>
    </BottomSheet.Modal>
  )
})
