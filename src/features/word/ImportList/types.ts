import { TWord } from '@/entities/word'

export type TImportListProps = {
  data: TWord[]
  setData: (data: TWord[]) => void
}
