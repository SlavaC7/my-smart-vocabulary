import { TFolder } from '@/entities/word'

export type TSelectFoldersProps = {
  value: TFolder[]
  onChange: (value: TFolder[]) => void
}
