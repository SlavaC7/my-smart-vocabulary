import React from 'react'

import { TAnswer } from '@/entities/test'

import { useQuizStore } from '@/entities/test/store'

import { Styled, TEColors, Typography } from '@/shared'

import * as S from './styles'
import { TAnswersProps } from './types'

export const Answers = ({
  _id = '',
  answers = [],
  onPressItem = () => {},
}: TAnswersProps) => {
  const { testAnswers } = useQuizStore()

  const haveAnswers = testAnswers.find(item => item.questionId === _id)

  const _onPress = (item: TAnswer) => {
    // dispatch(
    //   testsActions.correctAnswer({
    //     type: item.isCorrect ? 'correct' : 'incorrect',
    //   }),
    // )

    // dispatch(testsActions.setAnswer(item))

    onPressItem()
  }

  const renderItem = (item: TAnswer) => {
    const thisAnswer = item._id === haveAnswers?._id

    const color: TEColors = thisAnswer
      ? 'white'
      : !!haveAnswers && item.isCorrect
      ? 'white'
      : 'black'

    return (
      <S.ItemContainer
        {...{ thisAnswer, isCorrect: item.isCorrect }}
        disabled={!!haveAnswers}
        onPress={() => _onPress(item)}
        key={item._id}>
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
