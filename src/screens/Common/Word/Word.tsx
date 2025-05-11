import React from 'react'

import { useRoute } from '@react-navigation/native'

import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'

import { EScreens } from '@/app/navigation'
import { TScreenQueryProps } from '@/app/navigation/types'

import { useTypedSelector } from '@/app/store'

import { Header } from '@/widgets/header'

import { WordFeature } from '@/features'

import {
  getWordSelector,
  TranslateService,
  useWordControl,
  WordEntity,
} from '@/entities/word'

import {
  Background,
  Icon,
  Styled,
  Typography,
  useNavigation,
  useQuery,
} from '@/shared'

import { Common } from '@/shared/ui/common'

import * as S from './styles'

export const Word = () => {
  const { COLORS } = useTheme()
  const { t } = useTranslation()
  const { folders } = useTypedSelector(getWordSelector)
  const { existInAnyFolder } = useWordControl()
  const { navigate } = useNavigation()

  const {
    params: { word },
  } = useRoute<TScreenQueryProps<EScreens.WordMain>>()

  const { data: synonimsData } = useQuery(TranslateService.postSynonyms, {
    lang: 'english',
    word: word.text,
  })

  const synonims = synonimsData?.synonyms?.synonyms || []

  const folderName = folders?.find(item => item._id === word.folderId)?.name

  const onPressEdit = () => {
    navigate(EScreens.SearchOwnTranslation, {
      isHome: true,
      ...word,
    })
  }

  return (
    <Background.Container color={COLORS.background}>
      <Header.Standard
        goBack
        color={COLORS.background}
        rightAction={
          <WordFeature.HeaderActions
            onPressEdit={onPressEdit}
            wordId={word._id}
            folderId={word?.folderId || null}
          />
        }
      />

      <Background.Scroll>
        <S.WordContainer mTop="12px">
          <Typography.H1>
            {word.text} {word.flag}
          </Typography.H1>
          {!!folderName && (
            <Typography.Body2R color="neutral_500" mTop="8px">
              {folderName}
            </Typography.Body2R>
          )}
        </S.WordContainer>

        {!!word.type && (
          <Styled.FlexWrapper mTop={'8px'}>
            <WordEntity.TypeCard type={word.type} />
          </Styled.FlexWrapper>
        )}

        <S.TranslationContainer mTop="8px" mBottom="24px">
          <Icon name="Translate" size={16} />
          <Typography.Body1R mLeft="12px" style={S.styles.flex1}>
            {word.translations?.map(item => _.capitalize(item))?.join(' • ')}
          </Typography.Body1R>
        </S.TranslationContainer>

        {word?.examples?.map(item => (
          <S.ExampleContainer key={item.id.toString()} mBottom="12px">
            <Common.ColoredText
              highlightWords={item.source_phrases.map(val => val.phrase)}>
              {item.source}
            </Common.ColoredText>

            <Common.ColoredText
              color="neutral_500"
              mTop="4px"
              highlightWords={item.target_phrases.map(val => val.phrase)}>
              {item.target}
            </Common.ColoredText>
          </S.ExampleContainer>
        ))}

        {!!synonims?.length && (
          <>
            <Typography.Body1R color="neutral_500" mTop="4px" mBottom="12px">
              {t('word.synonyms')}
            </Typography.Body1R>

            <Styled.FlexWrapper wrap="wrap" justify="flex-start">
              {synonims.map(item => (
                <S.SynonymContainer
                  mRight="12px"
                  mBottom="12px"
                  key={item.id.toString()}>
                  <Typography.Body1R>{item.synonym}</Typography.Body1R>
                  <Icon name="ArrowUpRight" />
                </S.SynonymContainer>
              ))}
            </Styled.FlexWrapper>
          </>
        )}

        <Styled.Divider height={100} />
      </Background.Scroll>

      <S.Footer>
        <WordFeature.TextToSpeech text={word.text} />

        {!existInAnyFolder(word.text) && (
          <WordFeature.SaveButton word={word} mLeft="12px" />
        )}
      </S.Footer>
    </Background.Container>
  )
}
