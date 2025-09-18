import { EWordType } from '@/entities/word'

import { TMargin } from '@/shared'

export type TTypePickerProps = {
  value: EWordType[] | EWordType
  onChangeArray?: (value: EWordType[]) => void
  onChange?: (value: EWordType) => void
  hideLabel?: boolean
} & TMargin
