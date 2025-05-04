import { TWord } from '@/entities/word'

export type TImportInformationProps = {
  data: TWord[]
  onImport: () => void
  onSubmit: () => void
}
