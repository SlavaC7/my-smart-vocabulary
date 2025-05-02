import { EWordType } from '@/entities/word'

export type TCreateOwnTranslationForm = {
  word: string
  type: EWordType
  translations: Array<string>
}
