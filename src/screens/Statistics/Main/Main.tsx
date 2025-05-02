import React from 'react'

import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { useTheme } from 'styled-components'

import { useTypedSelector } from '@/app/store'

import { Header } from '@/widgets/header'

import { getWordSelector, TFolder, TWord } from '@/entities/word'

import { Background, Styled, Typography } from '@/shared'

export const Main = () => {
  const { t } = useTranslation()
  const { COLORS } = useTheme()
  const { words, folders } = useTypedSelector(getWordSelector)

  const latestWord = words.reduce((latest, current) => {
    return new Date(current.createdAt || '') > new Date(latest.createdAt || '')
      ? current
      : latest
  }, {} as TWord)

  const getFoldersWords = (id: string) => {
    return words.filter(item => item.folderId === id)
  }

  const renderFolders = (item: TFolder) => {
    return (
      <Styled.FlexWrapper
        mTop={'16px'}
        justify={'space-between'}
        key={item._id}>
        <Typography.H3Bold>{item.name}:</Typography.H3Bold>
        <Typography.H3Bold>
          {getFoldersWords(item._id).length}
        </Typography.H3Bold>
      </Styled.FlexWrapper>
    )
  }

  return (
    <Background.Container color={COLORS.background}>
      <Header.Standard
        title={t('statistics.title')}
        color={COLORS.background}
      />

      <Background.Standard pHorizontal={16}>
        <Styled.FlexWrapper justify={'space-between'}>
          <Typography.H3Bold>{t('statistics.total')}:</Typography.H3Bold>
          <Typography.Body1R>{words.length}</Typography.Body1R>
        </Styled.FlexWrapper>

        <Styled.FlexWrapper mTop={'16px'} justify={'space-between'}>
          <Typography.H3Bold>{t('statistics.last_adding')}:</Typography.H3Bold>
          <Typography.Body1R>
            {format(latestWord.createdAt || new Date(), 'dd.MM.yyyy')}
          </Typography.Body1R>
        </Styled.FlexWrapper>

        <Styled.FlexWrapper mTop={'16px'} justify={'space-between'}>
          <Typography.H3Bold>{t('statistics.total_folder')}:</Typography.H3Bold>
          <Typography.Body1R>{folders.length}</Typography.Body1R>
        </Styled.FlexWrapper>

        {!!folders.length && (
          <Styled.FlexWrapper mTop={'16px'} justify={'space-between'}>
            <Typography.H3Bold>{t('folder.folders')}:</Typography.H3Bold>
          </Styled.FlexWrapper>
        )}

        {folders.map(renderFolders)}
      </Background.Standard>
    </Background.Container>
  )
}
