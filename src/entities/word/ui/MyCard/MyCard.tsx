import React, { useCallback } from 'react'

import _ from 'lodash'

import { EScreens } from '@/app/navigation'

import { Icon, Styled, Typography, useNavigation } from '@/shared'

import { TWord } from '../../models'

import * as S from './styles'

export const MyCard = ({ word }: { word: TWord }) => {
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

      <Typography.Body2R color="neutral_500">
        {word.transaltions?.map(item => _.capitalize(item))?.join(', ')}
      </Typography.Body2R>
    </S.Container>
  )
}
