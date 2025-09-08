import React from 'react'

import { useTranslation } from 'react-i18next'

import { Input, Styled, Typography } from '@/shared'

import { styles } from './styles'
import { TAnswerTextProps } from './types'

export const AnswerText = ({
  answer,
  setAnswer,
  haveAnswer,
  correctWriteWord = [],
}: TAnswerTextProps) => {
  const { t } = useTranslation()
  const isHaveAnswer = !!haveAnswer

  const isCorrect = !!haveAnswer?.isCorrect

  const isCurrentCorrect = isHaveAnswer && isCorrect
  const isCurrentIncorrect = isHaveAnswer && !isCorrect

  const correctWords = correctWriteWord.map(item => item.trim()).join(', ')
  return (
    <>
      <Input.Form
        value={answer}
        disabled={isHaveAnswer}
        inputStyle={[isCurrentIncorrect && styles.incorrectInputText]}
        inputContainerStyle={[
          styles.default,
          isCurrentCorrect && styles.correct,
          isCurrentIncorrect && styles.incorrect,
        ]}
        onChange={setAnswer}
        mTop={'16px'}
      />

      {isCurrentIncorrect && (
        <Styled.FlexWrapper mTop={'10px'} justify={'flex-start'}>
          <Typography.Body1R>
            {t('tests.correctly')}:{' '}
            <Typography.Body2R color={'green_600'}>
              {correctWords}
            </Typography.Body2R>
          </Typography.Body1R>
        </Styled.FlexWrapper>
      )}
    </>
  )
}
