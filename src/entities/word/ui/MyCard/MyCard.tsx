import React, { useCallback } from 'react'

import _ from 'lodash'

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { EScreens } from '@/app/navigation'

import { Icon, Styled, Typography, useNavigation } from '@/shared'

import { WordEntity } from '../..'

import * as S from './styles'
import { TMyCardProps } from './types'

export const MyCard = ({ word, rightAction }: TMyCardProps) => {
  const navigation = useNavigation()

  const onPress = useCallback(() => {
    navigation.navigate(EScreens.WordMain, { word })
  }, [word])

  return (
    <Swipeable
      enableTrackpadTwoFingerGesture
      renderRightActions={event => rightAction()}>
      <S.Container onPress={onPress}>
        <Styled.FlexWrapper justify="space-between">
          <Typography.Body1R>{word.text}</Typography.Body1R>

          <Styled.FlexWrapper width={'auto'}>
            <Typography.Body1R>{word.flag || '🇺🇸'}</Typography.Body1R>
            <Icon name="ArrowUpRight" />
          </Styled.FlexWrapper>
        </Styled.FlexWrapper>

        {!!word.type && <WordEntity.TypeCard active type={word.type} />}

        <Typography.Body2R mTop={'5px'} color="neutral_500">
          {word.translations?.map(item => _.capitalize(item))?.join(', ')}
        </Typography.Body2R>
      </S.Container>
    </Swipeable>
  )
}
