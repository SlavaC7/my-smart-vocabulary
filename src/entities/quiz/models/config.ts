import { EWordType } from '@/entities/word'
import { TAvailableLang } from '@/entities/word/utils'

import { EQuizItemMode } from './test'

export type TQuizConfig = {
  count: number
  folders?: string[]
  type?: EWordType[]
  lang?: TAvailableLang[]
  mode?: EQuizItemMode[]
}
