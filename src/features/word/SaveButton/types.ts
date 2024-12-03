import { TWord } from '@/entities/word'

import { TMargin } from '@/shared'

export type TSaveButtonProps = {
  word: TWord
  variant?: 'default' | 'plus'
} & TMargin
