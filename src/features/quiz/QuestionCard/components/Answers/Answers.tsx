import React from 'react'

import { TAnswer } from '@/entities/quiz'

import { Styled, Typography } from '@/shared'

import { getCorrectTextColor } from './helper'
import * as S from './styles'
import { TAnswersProps } from './types'

export const Answers = ({
  answer,
  answers = [],
  haveAnswer,
  onPressItem = () => {},
}: TAnswersProps) => {
  const renderItem = (item: TAnswer) => {
    const isActive = answer === item.id
    const thisAnswer = item.id === haveAnswer?.answerId

    const color = getCorrectTextColor(
      isActive,
      thisAnswer,
      item.isCorrect,
      !!haveAnswer,
    )

    return (
      <S.ItemContainer
        {...{ thisAnswer, isActive: isActive, isCorrect: item.isCorrect }}
        disabled={!!haveAnswer}
        onPress={() => onPressItem(item.id)}
        key={item.id}>
        <Typography.Body1R color={color}>{item.text}</Typography.Body1R>
      </S.ItemContainer>
    )
  }
  return (
    <Styled.FlexWrapper mTop={'25px'} wrap={'wrap'}>
      {answers.map(renderItem)}
    </Styled.FlexWrapper>
  )
}
