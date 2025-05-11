import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'

import { wordActions } from '@/entities/word'

import { Button, Input, Styled, Typography, uuid } from '@/shared'
import { Modal } from '@/shared/ui/modal'

import { TBaseModalRef } from '@/shared/ui/modal/Base'

import { TAddFolderModalProps } from './types'

export const AddFolderModal = forwardRef<TBaseModalRef, TAddFolderModalProps>(
  ({}, ref) => {
    const currentRef = useRef<TBaseModalRef>(null)
    const { t } = useTranslation()
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          currentRef.current?.open()
        },
        close: () => {
          setValue('')
          currentRef.current?.close()
        },
      }),
      [],
    )

    const onClearText = () => {
      setValue('')
    }

    const onAdd = () => {
      if (!value) return

      dispatch(
        wordActions.createFolder({
          _id: uuid.v4(),
          name: value,
        }),
      )

      onClearText()
    }
    return (
      <Modal.Base ref={ref}>
        <Styled.FlexWrapper flexDirection={'column'} align={'flex-start'}>
          <Typography.H3 mBottom={'16px'}>
            {t('folder.enter_folder_name')}
          </Typography.H3>
          <Input.Standard
            onChange={setValue}
            value={value}
            onPressRightIcon={onClearText}
            mBottom={'16px'}
          />

          <Button.Standard text={t('button.add')} onPress={onAdd} />
        </Styled.FlexWrapper>
      </Modal.Base>
    )
  },
)
