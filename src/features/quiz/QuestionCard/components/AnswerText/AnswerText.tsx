import React from 'react'

import { Input } from '@/shared'

import { TAnswerTextProps } from './types'
import { styles } from './styles'

export const AnswerText = ({
  answer,
  setAnswer,
  haveAnswer,
}: TAnswerTextProps) => {
  const isHaveAnswer = !!haveAnswer

  const isCorrect = !!haveAnswer?.isCorrect

  const isCurrentCorrect = isHaveAnswer && isCorrect
  const isCurrentIncorrect = isHaveAnswer && !isCorrect
  return (
    <>
      <Input.Form
        value={answer}
        inputContainerStyle={[
          isCurrentCorrect && styles.correct,
          isCurrentIncorrect && styles.incorrect,
        ]}
        onChange={setAnswer}
        mTop={'16px'}
      />
    </>
  )
}
