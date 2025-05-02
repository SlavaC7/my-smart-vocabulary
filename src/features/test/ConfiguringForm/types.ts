import { EWordType } from '@/entities/word'
import { TAvailableLang } from '@/entities/word/utils'

export type TConfiguringFormRef = {}

export type TConfiguringForm = {
  folders: string[]
  count: number
  type: EWordType[]
  lang: TAvailableLang[]
}
