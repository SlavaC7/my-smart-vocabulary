import { TAvailableLang } from '../utils'

import { TTranslationExample } from './translate'

export type TWord = {
  _id: string
  word: string
  translations: Array<string>
  folderId?: string
  createdAt?: string
  examples?: Array<TTranslationExample>
  voice?: string
  type: EWordType
  code: TAvailableLang
  flag: string
}

export enum EWordType {
  word = 'word',
  phrase = 'phrase',
}
