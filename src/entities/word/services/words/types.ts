import { TQuery, TQueryListData } from '@/shared/api/types'

import { EWordType, TWord } from '../../models'

export type TGetWordsApi = TQuery<TGetWordsPayload, TGetWordsResponse>
type TGetWordsPayload = Partial<{
  search: string
  skip: number
  limit: number
}>

type TGetWordsResponse = TQueryListData<TWord>

export type TPostWordsApi = TQuery<TPostWordsPayload, TPostWordsResponse>
type TPostWordsPayload = {
  word: string
  translations: string[]
  folderId: string
  type: EWordType
  lang: string
  flag: string
}
type TPostWordsResponse = TWord

export type TPatchWordApi = TQuery<TPatchWordPayload, TPatchWordResponse>
type TPatchWordPayload = { id: string } & Partial<TPostWordsPayload>

type TPatchWordResponse = TWord

export type TGetWordByIdApi = TQuery<TGetWordByIdPayload, TGetWordByIdResponse>
type TGetWordByIdPayload = {
  id: string
}

type TGetWordByIdResponse = TWord
