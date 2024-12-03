import { TQuery } from '@/shared/api'

import { TSynonyms, TTranslation } from '../../models'

export type TPostTranslateApi = TQuery<
  TPostTranslatePayload,
  TPostTranslateResponse
>
type TPostTranslatePayload = {
  text: string
  fromLang: string
  toLang: string
}
type TPostTranslateResponse = { translation: TTranslation }

export type TPostContextApi = TQuery<TPostContextPayload, TPostContextResponse>
type TPostContextPayload = {
  text: string
  fromLang: string
  toLang: string
}
type TPostContextResponse = TTranslation

export type TPostSpellcheckApi = TQuery<
  TPostSpellcheckPayload,
  TPostSpellcheckResponse
>
type TPostSpellcheckPayload = {
  text: string
  lang: string
}
type TPostSpellcheckResponse = void

export type TPostSynonymsApi = TQuery<
  TPostSynonymsPayload,
  TPostSynonymsResponse
>
type TPostSynonymsPayload = {
  word: string
  lang: string
}
type TPostSynonymsResponse = { synonyms: TSynonyms }
