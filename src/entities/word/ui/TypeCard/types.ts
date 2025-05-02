import { TMargin, Typography } from '@/shared'

import { EWordType } from '../../models'

export type TTypeCardProps = {
  type: EWordType
  textComponent?: keyof typeof Typography
  active?: boolean
  onPress?: (value: EWordType) => void
  size?: 'small' | 'standard'
} & TMargin
