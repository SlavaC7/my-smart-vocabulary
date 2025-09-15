import React from 'react'

import { Typography } from '@/shared'

import * as S from './styles'
import { TWordAnswerStatsProps } from './types'

export const WordAnswerStats = ({
  incorrect = 0,
  correct = 0,
}: TWordAnswerStatsProps) => {
  const total = incorrect + correct

  const correctRecent = total > 0 ? (correct / total) * 100 : 0
  const incorrectRecent = total > 0 ? (incorrect / total) * 100 : 0
  return (
    <>
      <Typography.H3 mTop={'16px'}>Answers</Typography.H3>
      <S.Container mTop={'16px'}>
        <S.TypeContainer color={'green_200'}>
          <Typography.H2>{correct}</Typography.H2>

          <Typography.Body1R color={'neutral_500'} mTop={'5px'}>
            {correctRecent.toFixed(2)}%
          </Typography.Body1R>
        </S.TypeContainer>
        <S.TypeContainer color={'red_400'}>
          <Typography.H2 color={'red_400'}>{incorrect}</Typography.H2>
          <Typography.Body1R color={'neutral_500'} mTop={'5px'}>
            {incorrectRecent.toFixed(2)}%
          </Typography.Body1R>
        </S.TypeContainer>
      </S.Container>
    </>
  )
}
