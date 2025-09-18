import { TFolder } from '@/entities/word'

import { TMargin } from '@/shared'

export type TWordScreenFolderProps = {
  folderId: string | undefined
  folder?: TFolder | null
  onChange?: (folder: TFolder | null) => void
  width?: string
} & TMargin
