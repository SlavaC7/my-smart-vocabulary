import { EWordType, TFolder } from '@/entities/word'
import { TAvailableLang } from '@/entities/word/utils'

export type TConfiguringFormRef = {}

export type TConfiguringForm = {
  folders: TFolder[]
  count: number
  type: EWordType[]
  lang: TAvailableLang[]
}
