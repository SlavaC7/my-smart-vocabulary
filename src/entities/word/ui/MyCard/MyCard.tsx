import React, { useCallback } from 'react'

import _ from 'lodash'

import { useTranslation } from 'react-i18next'

import { EScreens } from '@/app/navigation'

import { Icon, Styled, Typography, useNavigation } from '@/shared'

import { TWord } from '../../models'

import * as S from './styles'

export const MyCard = ({ word }: { word: TWord }) => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const onPress = useCallback(() => {
    navigation.navigate(EScreens.WordMain, { word })
  }, [word])

  return (
    <S.Container onPress={onPress}>
      <Styled.FlexWrapper justify="space-between">
        <Typography.Body1R>{word.text}</Typography.Body1R>

        <Icon name="ArrowUpRight" />
      </Styled.FlexWrapper>

      {!!word.type && (
        <S.TypeContainer>
          <Typography.Caption1R color={'white'}>
            {t(`word_type.${word.type}`)}
          </Typography.Caption1R>
        </S.TypeContainer>
      )}

      <Typography.Body2R mTop={'5px'} color="neutral_500">
        {word.translations?.map(item => _.capitalize(item))?.join(', ')}
      </Typography.Body2R>
    </S.Container>
  )
}
