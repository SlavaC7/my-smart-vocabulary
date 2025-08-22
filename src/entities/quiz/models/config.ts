import { EWordType } from '@/entities/word'

export type TQuizConfig = {
  count: number
  folders?: string[]
  type?: EWordType[]
  lang?: string
}
