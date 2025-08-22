import { EWordType } from '@/entities/word'
import { TAvailableLang } from '@/entities/word/utils'

export type TQuizConfig = {
  count: number
  folders?: string[]
  type?: EWordType[]
  lang?: TAvailableLang[]
}
