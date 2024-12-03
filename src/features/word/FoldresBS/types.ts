import { TFolder } from '@/entities/word'

export type TFoldersBSProps = {
  onChange?: (folder: TFolder | null) => void
  value?: string | null
}
