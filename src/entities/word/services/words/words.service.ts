import { apiPrivate, TResponse } from '@/shared/api'

import * as T from './types'

export class WordsService {
  //get Words
  static async getWords(
    params: T.TGetWordsApi['payload'],
  ): TResponse<T.TGetWordsApi['response']> {
    return apiPrivate.get(`/words`, { params })
  }

  //Post Word
  static async postWord(
    data: T.TPostWordsApi['payload'],
  ): TResponse<T.TPostWordsApi['response']> {
    return apiPrivate.post(`/words`, data)
  }

  //get Word by id
  static async getWordById(
    params: T.TGetWordByIdApi['payload'],
  ): TResponse<T.TGetWordByIdApi['response']> {
    return apiPrivate.get(`/words/${params.id}`)
  }

  //get Word by id
  static async patchWord({
    id,
    ...data
  }: T.TPatchWordApi['payload']): TResponse<T.TPatchWordApi['response']> {
    return apiPrivate.patch(`/words/${id}`, data)
  }
}
