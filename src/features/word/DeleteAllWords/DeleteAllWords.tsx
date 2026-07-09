import { Button, Styled, Typography, useLoader } from '@/shared'
import { Modal } from '@/shared/ui/modal'
import { TBaseModalRef } from '@/shared/ui/modal/Base'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TDeleteAllWordsProps } from './types'
import { logger } from '@/shared/lib/tools/logger'
import { WordsService } from '@/entities/word'

export const DeleteAllWords = ({
  onRefresh = () => {},
}: TDeleteAllWordsProps) => {
  const { t } = useTranslation()
  const { setLoading } = useLoader()
  const modalRef = React.useRef<TBaseModalRef>(null)

  const onCloseModal = () => {
    modalRef.current?.close()
  }

  const onPressDeleteAll = () => {
    modalRef.current?.open()
  }

  const onDeleteAll = async () => {
    try {
      setLoading(true)
      onCloseModal()

      await WordsService.deleteAllWord()
      onRefresh()
    } catch (error) {
      logger.error('DB TankSN Error', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Styled.Touchable width="auto" onPress={onPressDeleteAll}>
        <Typography.Body2R color="red_600">
          {t('word.delete_all')}
        </Typography.Body2R>
      </Styled.Touchable>

      <Modal.Base ref={modalRef}>
        <Styled.FlexWrapper flexDirection="column" mBottom="20px">
          <Typography.H2>{t('word.are_u_sure')}</Typography.H2>
          <Typography.Body1R color="neutral_500" mTop="16px" align="center">
            {t('word.delete_all_description')}
          </Typography.Body1R>

          <Styled.FlexWrapper justify="space-between" mTop="20px">
            <Button.Standard
              type="custom"
              color="red_600"
              textColor="white"
              width="45%"
              height="40px"
              text={t('button.delete')}
              onPress={onDeleteAll}
            />
            <Button.Standard
              type="secondary"
              width="45%"
              height="40px"
              text={t('button.cancel')}
              onPress={onCloseModal}
            />
          </Styled.FlexWrapper>
        </Styled.FlexWrapper>
      </Modal.Base>
    </>
  )
}
