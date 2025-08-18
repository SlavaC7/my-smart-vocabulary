import { TFolder } from '../../models'

export type TFolderCardProps = {
  folder: TFolder
  isSelected: boolean
  width?: string
  onPress?: (item: TFolder) => void
  onPressDeleteFolder?: (value: string) => void
}
