import React, { useState } from 'react'

import { Keyboard, View } from 'react-native'

import { useTranslation } from 'react-i18next'

import { useShallow } from 'zustand/react/shallow'

import { EQuizItemMode, useQuizStore } from '@/entities/quiz'
import { QuizService } from '@/entities/quiz/services'
import { WordEntity } from '@/entities/word'

import { Button, EColors, errorHandler, Typography } from '@/shared'

import * as C from './components'
import { onTransString } from './helper'
import * as S from './styled'
import { TQuestionCardProps } from './types'

const QuestionCardComponent = ({
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

  // Select only what this card needs. setQuizState is a stable action, and
  // haveAnswer is scoped to THIS question via useShallow, so the card
  // re-renders exactly when its own answer changes — not when other cards
  // are answered (which only replaces the activeQuiz reference).
  const setQuizState = useQuizStore(state => state.setQuizState)
  const haveAnswer = useQuizStore(
    useShallow(state =>
      state.activeQuiz?.userAnswers.find(item => item.questionId === id),
    ),
  )

  const isCorrect = haveAnswer?.isCorrect

  const isMatch = mode === EQuizItemMode.match
  const isWrite = mode === EQuizItemMode.write_word

  const [answer, setAnswer] = useState('')

  const onAnswer = async () => {
    try {
      if (isWrite) Keyboard.dismiss()

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

      setQuizState({ activeQuiz: data })

      onPressItem()

      console.log('onPressItem')
    } catch (error) {
      errorHandler({
        error: error,
        name: 'Answer',
      })
    }
  }

  const color = haveAnswer
    ? isCorrect
      ? EColors.green_400
      : EColors.red_400
    : EColors.primary_200
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
        color={color}
      />
      <S.SmileContainer>
        <S.Flag>{flag}</S.Flag>
      </S.SmileContainer>
    </View>
  )
}

// Questions are immutable during a run, so with stable props (frozen item +
// stable onPressItem) this memo skips re-renders on unrelated store updates
// and carousel swipes. The internal haveAnswer selector still triggers a
// re-render when this card's own answer arrives.
export const QuestionCard = React.memo(QuestionCardComponent)
