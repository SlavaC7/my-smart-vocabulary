import React, { useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'

import { EScreens } from '@/app/navigation'

import { WordFeature } from '@/features/word'

import { TranslateService } from '@/entities/word'

import { formatTranslationToWord } from '@/entities/word/utils/format'

import {
  Background,
  Button,
  Icon,
  Styled,
  Typography,
  useNavigation,
  useQuery,
} from '@/shared'

import * as UI from './components'
import * as S from './styles'

export const Main = () => {
  const { COLORS } = useTheme()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [searchText, setSearchText] = useState('')

  const { data: translateData } = useQuery(TranslateService.postTranslate, {
    toLang: 'russian',
    fromLang: 'english',
    text: searchText,
    disableInitialCall: !searchText,
  })
  console.log('translateData: ', translateData)
  const word =
    translateData?.translation && !!searchText
      ? formatTranslationToWord(translateData.translation)
      : null

  const onPressCreateOwn = useCallback(() => {
    navigation.navigate(EScreens.SearchOwnTranslation)
  }, [])

  const onPressWord = useCallback(() => {
    navigation.navigate(EScreens.WordMain, { word })
  }, [word])

  return (
    <Background.Container>
      <Styled.Padding mBottom="12px">
        <WordFeature.SearchInput onChange={setSearchText} />
      </Styled.Padding>

      <S.TitleSection>
        <Typography.Caption1R
          textTransform="uppercase"
          color={COLORS.neutral_500}>
          {t('search.title')}
        </Typography.Caption1R>
      </S.TitleSection>

      {!!word && <UI.WordItem data={word} onPress={onPressWord} />}
      {!word && (
        <Styled.FlexWrapper mTop="16px">
          <Icon name="SearchOff" size={62} />
        </Styled.FlexWrapper>
      )}

      <S.TitleSection mTop="12px">
        <Typography.Caption1R
          textTransform="uppercase"
          color={COLORS.neutral_500}>
          {t('common.other')}
        </Typography.Caption1R>
      </S.TitleSection>

      <Button.Standard
        text={t('own_translation.create')}
        type="tertiary"
        icon="Plus"
        mTop="12px"
        onPress={onPressCreateOwn}
      />
    </Background.Container>
  )
}
