import { EWordType } from '@/entities/word'

export type TTypePickerProps = {
  value: EWordType | EWordType[]
  onChange: (value: EWordType | EWordType[]) => void
}
