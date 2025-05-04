import React from 'react'

import { useTranslation } from 'react-i18next'

import { useTypedSelector } from '@/app/store'

import { getWordSelector, TWord } from '@/entities/word'

import { Button, Styled, Typography } from '@/shared'

import { TImportInformationProps } from './types'

export const ImportInformation = ({
  onImport,
  data,
}: TImportInformationProps) => {
  const { t } = useTranslation()
  const { words } = useTypedSelector(getWordSelector)

  const existingWords = new Set(words.map(item => item.text))

  const { duplicates, newWords } = data.reduce(
    (acc, item) => {
      if (existingWords.has(item.text)) {
        acc.duplicates.push(item)
      } else {
        acc.newWords.push(item)
      }
      return acc
    },
    { duplicates: [] as TWord[], newWords: [] as TWord[] },
  )

  const isExist = !!data.length

  const total = data.length

  return (
    <Styled.FlexWrapper flexDirection={'column'}>
      {!!isExist && (
        <>
          <Styled.FlexWrapper mBottom={'16px'} justify={'space-between'}>
            <Typography.Body1R>{t('statistics.total')}</Typography.Body1R>
            <Typography.H3>{total}</Typography.H3>
          </Styled.FlexWrapper>
        </>
      )}

      <Button.Standard
        text={t('export_import.start_import')}
        mTop={'16px'}
        onPress={onImport}
      />
    </Styled.FlexWrapper>
  )
}
