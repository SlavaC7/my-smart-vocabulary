import { TTranslationExample } from './translate'

export type TWord = {
  _id: string
  text: string
  translations: Array<string>
  forderId?: string | null
  createdAt?: string
  examples?: Array<TTranslationExample>
  voice?: string
  type?: EWordType
  code: string
  flag: string
}

export enum EWordType {
  word = 'word',
  phrase = 'phrase',
}
