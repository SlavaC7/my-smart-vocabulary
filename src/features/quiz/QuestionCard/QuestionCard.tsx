import React from 'react'

import { View } from 'react-native'

import { WordEntity } from '@/entities/word'

import { EColors, Typography } from '@/shared'

import * as C from './components'
import * as S from './styled'
import { TQuestionCardProps } from './types'

export const QuestionCard = ({
  answers,
  word,
  _id,
  onPressItem,
  flag,
  type,
}: TQuestionCardProps) => {
  // const dispatch = useDispatch()
  return (
    <View style={S.styles.container}>
      <S.SVGContainer>
        <C.SvgComponent />

        {/* Content */}
        <S.ContentContainer>
          {/* <C.Progress count={totalCount} page={itemPosition} /> */}
          {/* <Icon name={'QuestionCircle'} size={56} /> */}
          <Typography.H1 style={S.styles.title} mTop={'12px'} align={'center'}>
            {word}
          </Typography.H1>

          <WordEntity.TypeCard type={type} mTop={'8px'} active />

          <C.Answers {...{ _id, answers, onPressItem }} />
        </S.ContentContainer>
      </S.SVGContainer>

      <C.SvgComponent
        style={S.styles.backgroundLayer}
        circle={2}
        minusWidth={40}
        color={EColors.blue_opacity}
      />
      <S.SmileContainer>
        <S.Flag>{flag}</S.Flag>
      </S.SmileContainer>
    </View>
  )
}
