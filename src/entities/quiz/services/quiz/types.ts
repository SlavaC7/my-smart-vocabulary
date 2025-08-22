// import { TQuery } from '@/shared/api/types'

import { TQuery } from '@/shared/api/types'

import { TQuiz, TQuizConfig } from '../../models'

export type TPostCreateQuizApi = TQuery<TGetUserMePayload, TGetUserMeResponse>
type TGetUserMePayload = TQuizConfig
type TGetUserMeResponse = TQuiz

export type TGetActiveQuizApi = TQuery<
  TGetActiveQuizPayload,
  TGetActiveQuizResponse
>
type TGetActiveQuizPayload = {}
type TGetActiveQuizResponse = TQuiz

export type TPostQuizAnswerApi = TQuery<
  TPostQuizAnswerPayload,
  TPostQuizAnswerResponse
>
type TPostQuizAnswerPayload = {
  id: string
  answerId: string
  questionId: string
  isCorrect: string
}
type TPostQuizAnswerResponse = TQuiz

export type TPostQuizCompleteApi = TQuery<
  TPostQuizCompletePayload,
  TPostQuizCompleteResponse
>
type TPostQuizCompletePayload = {
  id: string
}
type TPostQuizCompleteResponse = TQuiz

export type TGetQuizHistoryApi = TQuery<
  TGetQuizHistoryPayload,
  TGetQuizHistoryResponse
>
type TGetQuizHistoryPayload = Partial<{
  skip: number
  limit: number
  sortBy: string
  order: number
}>
type TGetQuizHistoryResponse = TQuiz
