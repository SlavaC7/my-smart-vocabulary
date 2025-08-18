import React from 'react'

import { useRoute } from '@react-navigation/native'

import _ from 'lodash'
import { useTheme } from 'styled-components'

import { EScreens } from '@/app/navigation'
import { TScreenQueryProps } from '@/app/navigation/types'

import { Header } from '@/widgets/header'

import { WordFeature } from '@/features'

import { useGetWord, useWordControl, WordEntity } from '@/entities/word'

import { Background, Icon, Styled, Typography, useNavigation } from '@/shared'

import { Common } from '@/shared/ui/common'

import * as S from './styles'

export const Word = () => {
  const { COLORS } = useTheme()
  const { existInAnyFolder } = useWordControl()
  const { navigate } = useNavigation()

  const {
    params: { word: paramWord },
  } = useRoute<TScreenQueryProps<EScreens.WordMain>>()

  const { word, getAction, folder } = useGetWord(paramWord._id, paramWord)

  // const { data: synonimsData } = useQuery(TranslateService.postSynonyms, {
  //   lang: 'english',
  //   word: word.word,
  // })

  // const synonims = synonimsData?.synonyms?.synonyms || []

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
            refresh={getAction}
            wordId={word._id}
            folderId={word?.folderId || null}
          />
        }
      />

      <Background.Scroll>
        <S.WordContainer mTop="12px">
          <Typography.H1>
            {word.word} {word.flag}
          </Typography.H1>
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
        <WordFeature.WordScreenFolder
          folder={folder}
          wordId={word._id}
          refresh={getAction}
        />

        {/* {!!synonims?.length && (
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
        )} */}

        <Styled.Divider height={100} />
      </Background.Scroll>

      <S.Footer>
        <WordFeature.TextToSpeech text={word.word} />

        {!existInAnyFolder(word.word) && (
          <WordFeature.SaveButton word={word} mLeft="12px" />
        )}
      </S.Footer>
    </Background.Container>
  )
}
