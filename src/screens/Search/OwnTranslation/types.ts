import { EWordType } from '@/entities/word'
import { TAvailableLang } from '@/entities/word/utils'

export type TCreateOwnTranslationForm = {
  word: string
  type: EWordType
  translations: Array<string>
  code: TAvailableLang
  flag: string
}

export type TSearchOwnTranslationScreenProps = {
  isHome?: boolean
  _id?: string
} & Partial<TCreateOwnTranslationForm>
