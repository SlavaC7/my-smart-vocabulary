import { apiPrivate, TResponse } from '@/shared/api'

import * as T from './types'

export class QuizService {
  //Create Quiz
  static async postCreateQuiz(
    data: T.TPostCreateQuizApi['payload'],
  ): TResponse<T.TPostCreateQuizApi['response']> {
    return apiPrivate.post(`/quiz/create`, data)
  }

  //Get active Quiz
  static async getActiveQuiz(): TResponse<T.TGetActiveQuizApi['response']> {
    return apiPrivate.get(`/quiz/quiz/active`)
  }

  //Answer to Quiz
  static async postQuizAnswer({
    id,
    ...data
  }: T.TPostQuizAnswerApi['payload']): TResponse<
    T.TPostQuizAnswerApi['response']
  > {
    return apiPrivate.post(`/quiz/quiz/${id}/answer`, { data })
  }

  //Complete Quiz
  static async postQuizComplete({
    id,
  }: T.TPostQuizCompleteApi['payload']): TResponse<
    T.TPostQuizCompleteApi['response']
  > {
    return apiPrivate.post(`/quiz/quiz/${id}/complete`)
  }

  //Cancel Quiz
  static async postQuizCancel({
    id,
  }: T.TPostQuizCompleteApi['payload']): TResponse<
    T.TPostQuizCompleteApi['response']
  > {
    return apiPrivate.post(`/quiz/quiz/${id}/cancel`)
  }

  //Clear Quiz History
  static async getQuizHistory(
    params: T.TGetQuizHistoryApi['payload'],
  ): TResponse<T.TGetQuizHistoryApi['response']> {
    return apiPrivate.get(`/quiz/history`, { params })
  }

  //Clear Quiz History
  static async deleteClearQuizHistory(): TResponse<
    T.TGetActiveQuizApi['response']
  > {
    return apiPrivate.delete(`/quiz/history/clear`)
  }
}
