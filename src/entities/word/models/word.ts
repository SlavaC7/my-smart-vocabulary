import { TTranslationExample } from './translate'

export type TWord = {
  _id: string
  text: string
  transaltions: Array<string>
  forderId?: string | null
  createdAt?: string
  examples?: Array<TTranslationExample>
  voice?: string
}
