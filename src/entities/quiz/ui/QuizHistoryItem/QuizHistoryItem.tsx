import React from 'react'

import { format } from 'date-fns'

import { Styled, Typography } from '@/shared'
import { shadowStyles } from '@/shared/lib/tools/shadow'

import * as S from './styles'
import { TQuizHistoryItem } from './types'

export const QuizHistoryItem = ({
  quiz: { createdAt, correct, incorrect, quiz },
  ...props
}: TQuizHistoryItem) => {
  const data = format(new Date(createdAt), 'dd.MM.yyyy HH:mm')
  const total = incorrect + correct

  const correctRecent = (total > 0 ? (correct / total) * 100 : 0).toFixed(0)
  const incorrectRecent = (total > 0 ? (incorrect / total) * 100 : 0).toFixed(0)
  return (
    <S.Container style={shadowStyles.shadow} {...props}>
      <Styled.FlexWrapper justify={'space-between'}>
        <Typography.Body2R color={'neutral_500'}>
          Quiz at: <Typography.Body2R color={'black'}>{data}</Typography.Body2R>
        </Typography.Body2R>

        <Typography.Body2R mTop={'5px'} color={'neutral_500'}>
          Total quizzes:{' '}
          <Typography.Body2R color={'black'}>{quiz.length}</Typography.Body2R>
        </Typography.Body2R>
      </Styled.FlexWrapper>

      <S.StatsContainer>
        <S.Stat color={'green_200'}>
          <Typography.Body2R>
            {correct}{' '}
            <Typography.Body2R color={'neutral_500'}>
              ({correctRecent}%)
            </Typography.Body2R>
          </Typography.Body2R>
        </S.Stat>

        <S.Stat color={'red_400'}>
          <Typography.Body2R>
            {incorrect}{' '}
            <Typography.Body2R color={'neutral_500'}>
              ({incorrectRecent}%)
            </Typography.Body2R>
          </Typography.Body2R>
        </S.Stat>
      </S.StatsContainer>

      <S.MoreDetails>
        <Typography.H3 color={'white'}>More</Typography.H3>
      </S.MoreDetails>
    </S.Container>
  )
}
