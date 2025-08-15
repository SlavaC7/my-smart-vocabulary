import React, { forwardRef, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Button, Input, Styled, Typography } from '@/shared'
import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetModalRef } from '@/shared/ui/bottomSheet/Modal'

import { Container, styles } from './styles'
import { TAddFolderModalProps } from './types'

export const AddFolderModal = forwardRef<
  TBottomSheetModalRef,
  TAddFolderModalProps
>(({ onClose = () => {} }, ref) => {
  // const currentRef = useRef<TBaseModalRef>(null)
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  // useImperativeHandle(
  //   ref,
  //   () => ({
  //     open: () => {
  //       currentRef.current?.open()
  //     },
  //     close: () => {
  //       setValue('')
  //       currentRef.current?.close()
  //     },
  //   }),
  //   [],
  // )

  const onClearText = () => {
    setValue('')
  }

  const onAdd = () => {
    if (!value) return

    // dispatch(
    //   wordActions.createFolder({
    //     _id: uuid.v4(),
    //     name: value,
    //   }),
    // )

    onClearText()
    onClose()
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
            {t('folder.enter_folder_name')}
          </Typography.H3>
          <Input.Standard
            onChange={setValue}
            value={value}
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
