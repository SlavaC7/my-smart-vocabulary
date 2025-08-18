import { TFolder } from '@/entities/word'

export type TWordScreenFolderProps = {
  folder: TFolder | null
  wordId: string
  refresh?: () => void
}
