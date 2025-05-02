import { EWordType } from '@/entities/word'

export type TTypePickerProps = {
  value: EWordType
  onChange: (value: EWordType) => void
}
