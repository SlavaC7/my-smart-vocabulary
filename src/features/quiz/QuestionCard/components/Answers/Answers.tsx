import React from 'react'

import { TAnswer } from '@/entities/quiz'

import { QuizService } from '@/entities/quiz/services'
import { useQuizStore } from '@/entities/quiz/store'

import { Styled, TEColors, Typography } from '@/shared'

import * as S from './styles'
import { TAnswersProps } from './types'

export const Answers = ({
  quizId,
  id = '',
  answers = [],
  onPressItem = () => {},
}: TAnswersProps) => {
  const { answer, setQuizState, activeQuiz } = useQuizStore()
  const haveAnswers = activeQuiz?.userAnswers.find(
    item => item.questionId === id,
  )

  const _onPress = async (item: TAnswer) => {
    try {
      const { data } = await QuizService.postQuizAnswer({
        id: quizId,
        answerId: item.id,
        isCorrect: item.isCorrect,
        questionId: id,
      })
      console.log('data =>', data)

      setQuizState({ activeQuiz: data })

      console.log('setQuizState')

      onPressItem()

      console.log('onPressItem')
    } catch (error) {
      console.log('Answer error =>', { ...error })
    }
  }

  console.log('haveAnswers =>', haveAnswers, activeQuiz?.userAnswers)
  const renderItem = (item: TAnswer) => {
    const thisAnswer = item.id === haveAnswers?.answerId

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
