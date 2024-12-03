import { apiPrivate, TResponse } from '@/shared/api'

import * as Types from './types'

export class TranslateService {
  static async postTranslate(
    payload: Types.TPostTranslateApi['payload'],
  ): TResponse<Types.TPostTranslateApi['response']> {
    return apiPrivate.post(`/translate`, payload)
  }

  static async postContext(
    payload: Types.TPostContextApi['payload'],
  ): TResponse<Types.TPostContextApi['response']> {
    return apiPrivate.post(`/context`, payload)
  }

  static async postSpellcheck(
    payload: Types.TPostSpellcheckApi['payload'],
  ): TResponse<Types.TPostSpellcheckApi['response']> {
    return apiPrivate.post(`/spellcheck`, payload)
  }

  static async postSynonyms(
    payload: Types.TPostSynonymsApi['payload'],
  ): TResponse<Types.TPostSynonymsApi['response']> {
    return apiPrivate.post(`/synonyms`, payload)
  }
}
