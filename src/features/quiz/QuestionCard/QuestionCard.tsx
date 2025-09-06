import React, { useState } from 'react'

import { View } from 'react-native'

import { useTranslation } from 'react-i18next'

import { EQuizItemMode, useQuizStore } from '@/entities/quiz'
import { QuizService } from '@/entities/quiz/services'
import { WordEntity } from '@/entities/word'

import { Button, EColors, errorHandler, Typography } from '@/shared'

import * as C from './components'
import { onTransString } from './helper'
import * as S from './styled'
import { TQuestionCardProps } from './types'

export const QuestionCard = ({
  answers,
  word,
  id,
  onPressItem = () => {},
  flag,
  type,
  quizId,
  wordId,
  mode,
  correctWriteWord = [],
}: TQuestionCardProps) => {
  const { t } = useTranslation()
  const { setQuizState, activeQuiz } = useQuizStore()

  const haveAnswer = activeQuiz?.userAnswers.find(
    item => item.questionId === id,
  )

  const isMatch = mode === EQuizItemMode.match
  const isWrite = mode === EQuizItemMode.write_word

  const [answer, setAnswer] = useState('')

  const onAnswer = async () => {
    try {
      const currentAnswer = answers.find(item => item.id === answer)

      const isWriteCorrect = correctWriteWord
        .map(item => onTransString(item))
        .includes(onTransString(answer))

      const { data } = await QuizService.postQuizAnswer({
        id: quizId,
        answerId: isMatch ? currentAnswer?.id || '' : '',
        isCorrect: isMatch ? currentAnswer?.isCorrect || false : isWriteCorrect,
        answerText: isWrite ? answer : '',
        questionId: id,
        wordId: wordId,
        mode,
      })

      console.log('data =>', data)

      setQuizState({ activeQuiz: data })

      console.log('setQuizState')

      onPressItem()

      console.log('onPressItem')
    } catch (error) {
      errorHandler({
        error: error,
        name: 'Answer',
      })
    }
  }
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

          {isMatch && (
            <C.Answers
              {...{
                answer,
                answers,
                onPressItem: setAnswer,
                haveAnswer,
              }}
            />
          )}

          {isWrite && (
            <C.AnswerText
              {...{
                haveAnswer,
                answer,
                setAnswer,
                correctWriteWord,
              }}
            />
          )}
          <Button.Standard
            mTop={'16px'}
            disabled={!answer || !!haveAnswer}
            text={t('button.answer')}
            onPress={onAnswer}
          />
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
