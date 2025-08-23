import React, { useCallback } from 'react'

import _ from 'lodash'

import { useTranslation } from 'react-i18next'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { EScreens } from '@/app/navigation'

import { Icon, Styled, Typography, useNavigation } from '@/shared'

import { WordEntity } from '../..'

import * as S from './styles'
import { TMyCardProps } from './types'

export const MyCard = ({ word, rightAction }: TMyCardProps) => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const onPress = useCallback(() => {
    navigation.navigate(EScreens.WordMain, { word })
  }, [word])

  return (
    <Swipeable
      enableTrackpadTwoFingerGesture
      renderRightActions={() => rightAction()}>
      <S.Container onPress={onPress}>
        <Styled.FlexWrapper justify="space-between">
          <Typography.Body1R>{word.word}</Typography.Body1R>

          <Styled.FlexWrapper width={'auto'}>
            <Typography.Body2R mRight={'5px'}>
              <Typography.Body2R color={'green_300'}>
                {word?.correct || 0}
              </Typography.Body2R>{' '}
              |{' '}
              <Typography.Body2R color={'red_300'}>
                {word?.incorrect || 0}
              </Typography.Body2R>
            </Typography.Body2R>
            <Typography.Body1R>{word.flag || '🇺🇸'}</Typography.Body1R>
          </Styled.FlexWrapper>
        </Styled.FlexWrapper>

        {!!word.type && (
          <WordEntity.TypeCard mTop={'5px'} active type={word.type} />
        )}

        <Typography.Body2R mTop={'5px'} color="neutral_500">
          {word.translations?.map(item => _.capitalize(item))?.join(', ')}
        </Typography.Body2R>
      </S.Container>
    </Swipeable>
  )
}
